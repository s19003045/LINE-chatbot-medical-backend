'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const bodyParser = require('body-parser')

const db = require('./models')
const Chatbot = db.Chatbot

const { initHandleEvent } = require('./handles/handleEvent')

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  // 如果不是 production 模式
  // 使用 dotenv 讀取 .env 檔案
  require('dotenv').config()
}


const redis = require('redis')
const session = require('express-session')

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

const passport = require('./config/passport')

// create Express app
const app = express();

// cors
const cors = require('cors')

// logger
const httpLogger = require('./config/httpLogger');
const logger = require('./config/logger');

// use Logger
app.use(httpLogger);

// cors setting
app.use(cors())
// 使用 body-parser 解析 url，並使用 qs 套件
app.use(bodyParser.urlencoded({ extended: true }))
// 使用 body-parser 解析 application/json，並將 buffer 轉成 string，存進 req.rawBody
app.use(
  bodyParser.json({
    verify: (req, _, buf) => {
      req.rawBody = buf.toString();
    },
  })
)

// use redis session
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

// serve static files
app.use('/public', express.static('public'));


// register a webhook handler with middleware
// about the middleware, please refer to doc
app.use('/:botId/callback', async (req, res, next) => {
  try {
    // 測試用途，了解 event 內容
    console.log('req.body:', req.body)
    console.log('event.source:', req.body.events[0].source)
    console.log('event.message:', req.body.events[0].message)

    const chatbot = await Chatbot.findOne({
      where: {
        botId: req.params.botId
      }
    })

    // create LINE SDK config from env variables
    const config = {
      channelAccessToken: chatbot.CHANNEL_ACCESS_TOKEN,
      channelSecret: chatbot.CHANNEL_SECRET,
    };

    // create LINE SDK client
    const client = new line.Client(config);
    // console.log('client (app.js)=>>>', client)
    // 建立 handleEvent
    const handleEvent = initHandleEvent(client)
    // 將 handleEvent 傳到下一個 middleware
    req.handleEvent = handleEvent

    // middleware
    line.middleware(config)

    next()
  } catch (err) {
    console.log(err)
  }
})

app.post('/:botId/callback', (req, res) => {
  req.body.events.forEach(d => {
    d.reqParams = req.params
  })

  return Promise
    .all(req.body.events.map(req.handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port} `);
});

require('./routes')(app)

// module.exports = client
