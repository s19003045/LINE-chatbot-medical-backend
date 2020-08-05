'use strict'

// import model
const db = require('../../models')
const ReplyModule = db.ReplyModule
const Chatbot = db.Chatbot

const triggerReply = async function ({
  replyToken,
  source,
  event,
  client,
  data,
  reqParams
}) {
  try {
    // 依 webhook URL 的 params.botId 找到對應的 ChatbotId
    const chatbot = await Chatbot.findOne({
      where: {
        botId: reqParams.botId
      }
    })

    const replyModule = await ReplyModule.findOne({
      where: {
        id: data.triggerModuleId,
        ChatbotId: chatbot.id
      }
    })

    if (replyModule) {
      // 模組使用次數+1
      await replyModule.increment(['moduleUsedCount'], {
        by: 1
      })

      return client.replyMessage(event.replyToken, replyModule.replyMessage)
    } else {
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '針對這個問題，我還沒辦法回答，你要不要先問我別的問題？'
      })
    }
  } catch (err) {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '系統異常，請稍後再試'
    })
  }
}

module.exports = triggerReply