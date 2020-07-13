'use strict'
// base URL for webhook server
let baseURL = process.env.BASE_URL;

// import flex template
const flexBubble = require('../templates/flexMessages/flex_bubble')
const flexCarousel = require('../templates/flexMessages/flex_carousel')

const db = require('../models')
const TextEvent = db.TextEvent
const ReplyMessage = db.ReplyMessage
const { Op } = require("sequelize")

function handleText(message, replyToken, source, client, replyText) {
  let replyMsg
  const imageURL = `${baseURL}/public/images`
  const videoURL = `${baseURL}/public/videos`
  const audioURL = `${baseURL}/public/audios`

  //關鍵字相符情形：等於、包含、不包含
  //文字開頭是、文字結尾是
  //數字相符情形：>=、>、=、<=、<
  console.log(message.text)
  //字串完全相符
  return TextEvent.findOne({
    where: {
      text: message.text
    },
    include: [
      {
        model: ReplyMessage
      }
    ]
  })
    .then((textEvent) => {
      console.log('textEvent:', textEvent)
      if (textEvent) {
        return client.replyMessage(replyToken, textEvent.ReplyMessage.messageTemplate)
      } else {
        return client.replyMessage(replyToken, {
          type: 'text',
          text: '這個問題我還沒辦法回答，你要不要先問我別的問題？'
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = { handleText }