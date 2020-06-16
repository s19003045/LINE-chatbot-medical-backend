'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

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

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.use('/', line.middleware(config))
app.use('/callback', line.middleware(config), (req, res, next) => {
  console.log('req.header:', req.headers)
  console.log('req.body:', req.body)
  // console.log('event.type:', req.body.events[0].type)
  // console.log('event.replyToken:', req.body.events[0].replyToken)
  console.log('event.source:', req.body.events[0].source)
  console.log('event.message:', req.body.events[0].message)

  next()
})

app.post('/', (req, res) => {
  console.log(req.body)
app.post('/callback', (req, res) => {
  // return res.json('Hello, I am doctor')
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.get('/', (req, res) => {
  return res.json('I am crocodile doctor.')
})
// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  // 官網測試 webhookURL
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log("Test hook recieved: " + JSON.stringify(event.message));
  }
  let replyMsg
  switch (event.type) {
    case 'message':
      const message = event.message
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken, event.source)
        case 'image':
          return client.replyMessage(event.replyToken, {
            type: 'text', text: 'sorry, I don\'t know the image says.'
          })
        default:
          return handleText(event.replyToken, ['welcome', 'John'
          ])
      }

    case 'follow':
      replyMsg = { type: 'text', text: 'welcome to crocodile doctor' }
      return client.replyMessage(event.replyToken, replyMsg
      )

    case 'join':
      replyMsg = ['hello', 'world']
      return client.replyText(event.replyToken, replyMsg)

    default:
      replyMsg = {
        type: 'text', text: `hi ${event.source.userId}, I don't know what you say.`
      }
      return client.replyToken(event.replyToken, replyMsg)

  }



  // if (event.type !== 'message' || event.message.type !== 'text') {
  //   // ignore non-text-message event
  //   return Promise.resolve(null);
  // }

  // // create a echoing text message
  // const echo = { type: 'text', text: event.message.text };

  // // use reply API
  // return client.replyMessage(event.replyToken, echo);
}

function handleText(message, replyToken, source) {
  switch (message.text) {
    case 'hi':
      const replyMsg = [{
        type: 'text',
        text: '1234'
      },
      {
        type: 'text',
        text: '5678'
      },
      {
        type: 'text',
        text: '5678'
      },
      {
        type: 'text',
        text: '5678'
      },
      {
        type: 'text',
        text: '5678'
      }]
      return client.replyMessage(replyToken, replyMsg)
    case 'profile':
      return client.getProfile(source.userId)
        .then((profile) => {
          console.log('profile:', profile)
          return replyText(replyToken, [
            `Your name: ${profile.displayName}`,
            `Status message: ${profile.statusMessage}`
          ])
        })
    case 'getGroup':
      return client.getGroupMemberProfile(source.groupId, source.userId)
    default:
      return replyText(replyToken, 'nothing to say')
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});



