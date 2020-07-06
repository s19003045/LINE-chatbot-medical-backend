const db = require('../models')
const TextEvent = db.TextEvent
const ReplyMessage = db.ReplyMessage
const { v4: uuidv4 } = require('uuid');

const fakedReplyMsg = {
  uuid: '2b792cd4-e0a6-4368-a9ec-4628f682c6et',
  messageTemplate: {
    type: "text",
    text: "world"
  }
}

const fakedTextEvent = {
  uuid: 'feaa9c43-26ac-4b7a-bdf0-2666cbfebekk',
  textEvent: {
    type: 'text',
    text: 'hello'
  }
}

const replyMsgService = {
  // create reply message for text event
  createKeywordReply: async (req, res, callback) => {
    try {
      // 先建立 reply message
      const replyMessage = await ReplyMessage.findOrCreate({
        where: {
          uuid: fakedReplyMsg.uuid
        },
        defaults: {
          type: 'text',
          uuid: uuidv4(),
          replyMsgCount: 0,
          readMsgCount: 0,
          messageTemplate: fakedReplyMsg.messageTemplate,
          status: 'edited'
        }
      })
      // 取得ReplyMessageId後，再來建立觸發事件
      const textEvent = await TextEvent.findOrCreate({
        where: {
          uuid: fakedTextEvent.uuid
        },
        defaults: {
          type: 'text',
          uuid: uuidv4(),
          text: fakedTextEvent.textEvent.text,
          ReplyMessageId: replyMessage[0].id
        }
      })

      if (textEvent) {
        const data = {
          status: 'success',
          message: 'create reply-message for text event successifully!'
        }
        callback(data)
      }
    } catch (err) {
      console.log(err)
    }
  },

  getKeywordReply: async (req, res, callback) => {
    try {
      const textEvent = await TextEvent.findAll({
        include: [
          { model: ReplyMessage }
        ]
      })

      if (textEvent) {
        const data = {
          status: "success",
          message: "create reply-message for text event successifully!",
          // replyMessage: replyMessage,
          textEvent: textEvent
        }
        callback(data)
      } else if (!textEvent) {
        const data = {
          status: "success",
          message: "暫無資料或取得資料失敗",
          // replyMessage: replyMessage,
          textEvent: textEvent
        }
        callback(data)
      }
    } catch (err) {
      console.log(err)
    }
  },

  putKeywordReply: (req, res, callback) => {
    callback("put a text event")
  },

  deleteKeywordReply: (req, res, callback) => {
    callback("delete a text event")
  },

}

module.exports = replyMsgService