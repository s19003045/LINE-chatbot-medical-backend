const db = require("../models")
const TextEvent = db.TextEvent
const ReplyMessage = db.ReplyMessage
const ModuleKeyword = db.ModuleKeyword
const { v4: uuidv4 } = require("uuid");
const client = require("../app");


const replyMsgService = {
  // create reply message for text event
  createKeywordReply: async (req, res, callback) => {
    const { ChatbotId, module, textEvents, replyMessage } = req.body
    try {
      // 先建立 moduleKeyword
      const moduleKeyword = await ModuleKeyword.findOrCreate({
        where: {
          uuid: module.uuid ? module.uuid : null
        },
        defaults: {
          name: module.name === null ? '' : module.name,
          uuid: uuidv4(),
          status: module.status === null ? 'edited' : module.status,
          ChatbotId: ChatbotId,
        }
      })
      console.log('moduleKeyword:', moduleKeyword)
      // 再建立 reply message
      const replyMsg = await ReplyMessage.findOrCreate({
        where: {
          uuid: replyMessage.uuid ? replyMessage.uuid : null
        },
        defaults: {
          type: replyMessage.type === null ? null : replyMessage.type,
          name: replyMessage.name === null ? '' : replyMessage.name,
          uuid: uuidv4(),
          replyMsgCount: 0,
          readMsgCount: 0,
          messageTemplate: replyMessage.messageTemplate ? replyMessage.messageTemplate : {},
          status: replyMessage.status ? replyMessage.status : "edited",
          ChatbotId: ChatbotId,
          ModuleKeywordId: moduleKeyword[0].id
        }
      })

      // 建立 textEvents，使用 Promise.all()
      const createTextEvents = []
      for (i = 0; i < textEvents.length; i++) {
        createTextEvents.push(await TextEvent.findOrCreate({
          where: {
            uuid: textEvents[i].uuid ? textEvents[i].uuid : null
          },
          defaults: {
            type: "text",
            uuid: uuidv4(),
            text: textEvents[i].text ? textEvents[i].text : null,
            ReplyMessageId: replyMsg[0].id,
            ChatbotId: ChatbotId
          }
        }))
      }

      Promise.all(createTextEvents)
        .then((textEvents) => {
          console.log('textEvents:', textEvents[0])
          if (moduleKeyword && replyMsg && textEvents) {
            return res.json({
              status: 'success',
              message: {
                moduleKeywordId: moduleKeyword[0].id,
                replyMessage: replyMsg[0].id,
                textEvents: textEvents
              }
            })
          } else {
            return res.json({
              status: 'failure',
              message: '連線異常，請稍後再試'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })

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