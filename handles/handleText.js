'use strict'

const db = require('../models')
const Keyword = db.Keyword
const ReplyModule = db.ReplyModule
const Chatbot = db.Chatbot

const { Op } = require("sequelize")

async function handleText({
  message,
  replyToken,
  source,
  client,
  reqParams
}) {
  try {
    console.log('reqParams(in handleText)', reqParams)
    //關鍵字相符情形：等於、包含、不包含
    //文字開頭是、文字結尾是
    //數字相符情形：>=、>、=、<=、<


    // 依 webhook URL 的 params.botId 找到對應的 ChatbotId
    const chatbot = await Chatbot.findOne({
      where: {
        botId: reqParams.botId
      }
    })

    // 依 ChatbotId 找尋關鍵字
    //字串完全相符
    const keyword = await Keyword.findOne({
      where: {
        name: message.text,
        ChatbotId: chatbot.id
      },
      include: [
        {
          model: ReplyModule
        }
      ]
    })

    if (keyword) {
      await keyword.increment(['usedCount'], {
        by: 1
      })

      // 關鍵字使用次數+1
      await keyword.ReplyModule.increment(['moduleUsedCount'], {
        by: 1
      })

      return client.replyMessage(replyToken, keyword.ReplyModule.replyMessage)
    } else {
      return client.replyMessage(replyToken, {
        type: 'text',
        text: '這個問題我還沒辦法回答，你要不要先問我別的問題？'
      })
    }
  }
  catch (err) {
    console.log(err)
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '系統異常，請稍後再試',
    })
  }

}

module.exports = { handleText }