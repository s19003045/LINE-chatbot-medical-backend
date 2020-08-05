'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const bodyParser = require('body-parser')

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  // 如果不是 production 模式
  // 使用 dotenv 讀取 .env 檔案
  require('dotenv').config()
}

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);
// create handleEvent
const { initHandleEvent } = require('./handles/handleEvent')
const handleEvent = initHandleEvent(client)

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

// serve static files
app.use('/public', express.static('public'));

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.use('/:botId/callback', line.middleware(config), (req, res, next) => {
  // 測試用途，了解 event 內容
  console.log('req.header:', req.headers)
  console.log('req.body:', req.body)
  console.log('event.source:', req.body.events[0].source)
  console.log('event.message:', req.body.events[0].message)
  console.log('event.postback:', req.body.events[0].postback)

  next()
})

app.post('/:botId/callback', (req, res) => {
  req.body.events.forEach(d => {
    d.reqParams = req.params
  })

  return Promise
    .all(req.body.events.map(handleEvent))
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

module.exports = client
