'use strict'

// import model
const db = require('../models')
const PostBackEvent = db.PostBackEvent
const ReplyMessage = db.ReplyMessage
const ModulePostBack = db.ModulePostBack

// import helpers
const querystring = require('querystring');
// base URL for webhook server
let baseURL = process.env.BASE_URL;

// 處理 postback 訊息
function handlePostback(event, client, replyText) {
  const imageURL = `${baseURL}/public/images`
  let data = event.postback.data
  let _data = querystring.parse(data)

  return PostBackEvent.findOne({
    where: {
      subject: _data.subject,
      data: _data.data
    },
    include: [
      { model: ReplyMessage },
      { model: ModulePostBack }
    ]
  })
    .then(async (postBackEvent) => {
      try {
        if (postBackEvent) {
          //replyMessage 使用次數+1
          const replyMessageIncrement = await postBackEvent.ReplyMessage.increment(['replyMsgCount'], {
            by: 1
          })
          //module 使用次數+1
          const modulePostBackIncrement = await postBackEvent.ModulePostBack.increment(['moduleUsedCount'], {
            by: 1
          })

          if (replyMessageIncrement && modulePostBackIncrement) {
            return client.replyMessage(event.replyToken, postBackEvent.ReplyMessage.messageTemplate)
          }
        } else {
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: '針對這個問題，我還沒辦法回答，你要不要先問我別的問題？'
          })
        }
      } catch (err) {
        console.log(err)
        return client.replyMessage(replyToken, {
          type: 'text',
          text: '這個問題我還沒辦法回答，你要不要先問我別的問題？'
        })
      }
    })
    .catch(err => {
      console.log(err)
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '系統異常，請稍後再試'
      })
    })
}

module.exports = { handlePostback }