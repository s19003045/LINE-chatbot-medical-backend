'use strict'

// import model
const db = require('../models')
const ReplyModule = db.ReplyModule

// import helpers
const querystring = require('querystring');
const triggerReply = require('./postbackHelper/triggerReply.js')

// base URL for webhook server
let baseURL = process.env.BASE_URL;

// 處理 postback 訊息
function handlePostback({
  event,
  client,
  replyText,
  reqParams
}) {
  console.log('reqParams(in handlePostback)', reqParams)
  let data = event.postback.data
  let _data = querystring.parse(data)

  switch (_data.action) {
    case 'triggerReply':
      return triggerReply(event, client, _data)
    default:
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '針對這個問題，我還沒辦法回答，你要不要先問我別的問題？'
      })
  }
}

module.exports = { handlePostback }