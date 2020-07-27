'use strict'

// import model
const db = require('../../models')
const ReplyModule = db.ReplyModule

const triggerReply = async function (event, client, data) {
  try {
    const replyModule = await ReplyModule.findOne({
      where: {
        id: data.triggerModuleId,
      }
    })

    if (replyModule) {
      // 使用次數+1
      return replyModule.increment(['moduleUsedCount'], {
        by: 1
      })
        .then(() => {
          return client.replyMessage(event.replyToken, replyModule.replyMessage)
        })
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