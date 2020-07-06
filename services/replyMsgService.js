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
          // 整理 textEvents 的資料
          const _textEvents = []
          textEvents.forEach(d => {
            _textEvents.push(d[0])
          })

          if (moduleKeyword && replyMsg && _textEvents) {
            const data = {
              status: "success",
              message: "成功取得資料",
              data: {
                moduleKeywordId: moduleKeyword[0].id,
                replyMessage: replyMsg[0].id,
                textEvents: _textEvents
              }
            }
            callback(data)
          } else {
            const data = {
              status: "success",
              message: "資料存取失敗，請稍後再試",
            }
            callback(data)
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
      const { ChatbotId } = req.query

      //取得 moduleKeywords 資料, moduleKeywords join replyMessages, replyMessages join textEvents
      const moduleKeywords = await ModuleKeyword.findAll({
        where: {
          ChatbotId: ChatbotId
        },
        include: [
          {
            model: ReplyMessage,
            include: [
              {
                model: TextEvent
              }
            ]
          }
        ]
      })

      if (moduleKeywords) {
        const data = {
          status: "success",
          message: "成功取得資料",
          data: {
            moduleKeywords: moduleKeywords
          }
        }
        callback(data)
      } else {
        const data = {
          status: "success",
          message: "暫無資料或取得資料失敗",
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