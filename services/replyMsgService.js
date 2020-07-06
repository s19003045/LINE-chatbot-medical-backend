const db = require("../models")
const TextEvent = db.TextEvent
const ReplyMessage = db.ReplyMessage
const ModuleKeyword = db.ModuleKeyword
const { v4: uuidv4 } = require("uuid");
const client = require("../app");


const replyMsgService = {
  // 新增 module keyword
  createModuleKeyword: async (req, res, callback) => {
    const { ChatbotId } = req.body
    const moduleKeyword = await ModuleKeyword.create({
      name: '',
      uuid: uuidv4(),
      status: 'edited',
      ChatbotId: ChatbotId,
    })
    if (moduleKeyword) {
      callback({
        status: 'success',
        message: '成功建立模組',
        data: {
          moduleKeyword: moduleKeyword
        }
      })
    } else {
      callback({
        status: 'failed',
        message: '新增模組失敗，請稍後再試'
      })
    }
  },
  // 刪除 module keyword
  deleteModuleKeyword: async (req, res, callback) => {
    const { ChatbotId, moduleKeyword } = req.body
    const moduleKeywordDelete = await ModuleKeyword.destroy({
      where: {
        ChatbotId: ChatbotId,
        uuid: moduleKeyword.uuid
      }
    })
    if (moduleKeywordDelete) {
      callback({
        status: 'success',
        message: '成功刪除模組',
        data: {
          moduleKeywordDelete: moduleKeywordDelete
        }
      })
    } else {
      callback({
        status: 'failed',
        message: '刪除模組失敗，請稍後再試'
      })
    }
  },
  // 新增 reply message
  createReplyMessage: async (req, res, callback) => {
    const { ChatbotId } = req.body
    const replyMessage = await ReplyMessage.create({
      name: '',
      uuid: uuidv4(),
      status: 'edited',
      ChatbotId: ChatbotId,
    })
    if (replyMessage) {
      callback({
        status: 'success',
        message: '成功新增',
        data: {
          replyMessage: replyMessage
        }
      })
    } else {
      callback({
        status: 'error',
        message: '新增失敗，請稍後再試'
      })
    }
  },
  // 刪除 reply message
  deleteReplyMessage: async (req, res, callback) => {
    const { ChatbotId, replyMessage } = req.body
    const replyMessageDeleted = await ReplyMessage.destroy({
      where: {
        ChatbotId: ChatbotId,
        uuid: replyMessage.uuid
      }
    })
    if (replyMessageDeleted) {
      callback({
        status: 'success',
        message: '成功刪除',
        data: {
          replyMessageDeleted: replyMessageDeleted
        }
      })
    } else {
      callback({
        status: 'error',
        message: '刪除失敗，請稍後再試'
      })
    }
  },
  // 新增 text event
  createTextEvent: (req, res, callback) => {
    callback("createTextEvent")
  },
  // 刪除 text event
  deleteTextEvent: (req, res, callback) => {
    callback("deleteTextEvent")
  },



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

  putKeywordReply: async (req, res, callback) => {
    const { ChatbotId, module, textEvents, replyMessage } = req.body
    try {
      // 找出 moduleKeyword
      const moduleKeyword = await ModuleKeyword.findOne({
        where: {
          uuid: module.uuid
        }
      })

      //修改 moduleKeyword
      moduleKeyword.name = module.name === null ? '' : module.name
      moduleKeyword.uuid = module.uuid
      moduleKeyword.status = module.status === null ? 'edited' : module.status
      moduleKeyword.ChatbotId = ChatbotId
      //儲存資料
      await moduleKeyword.save()
      console.log('moduleKeyword:', moduleKeyword)

      //尋找 replyMessage 資料
      let replyMsg = await ReplyMessage.findOne({
        where: {
          uuid: replyMessage.uuid
        }
      })

      if (replyMsg) {
        replyMsg.type = replyMessage.type ? replyMessage.type : null
        replyMsg.name = replyMessage.name ? replyMessage.name : ''
        replyMsg.uuid = replyMessage.uuid
        replyMsg.messageTemplate = replyMessage.messageTemplate ? replyMessage.messageTemplate : {}
        replyMsg.ChatbotId = ChatbotId
        replyMsg.ModuleKeywordId = moduleKeyword.id
        //儲存資料
        await replyMsg.save()
      } else {
        replyMsg = await ReplyMessage.create({
          type: replyMessage.type === null ? null : replyMessage.type,
          name: replyMessage.name === null ? '' : replyMessage.name,
          uuid: uuidv4(),
          replyMsgCount: 0,
          readMsgCount: 0,
          messageTemplate: replyMessage.messageTemplate ? replyMessage.messageTemplate : {},
          status: replyMessage.status ? replyMessage.status : "edited",
          ChatbotId: ChatbotId,
          ModuleKeywordId: moduleKeyword.id
        })
      }

      // 建立 textEvents，使用 Promise.all()
      const createTextEvents = []
      for (i = 0; i < textEvents.length; i++) {
        createTextEvents.push(await TextEvent.update({
          type: "text",
          text: textEvents[i].text ? textEvents[i].text : null,
          ReplyMessageId: replyMsg.id,
          ChatbotId: ChatbotId
        }, {
          where: {
            uuid: textEvents[i].uuid
          }
        }))
      }

      Promise.all(createTextEvents)
        .then((textEvents) => {
          console.log('textEvents:', textEvents)

          callback({
            status: 'not finished'
          })
          // 整理 textEvents 的資料
          // const _textEvents = []
          // textEvents.forEach(d => {
          //   _textEvents.push(d[0])
          // })

          // if (moduleKeyword && replyMsg && _textEvents) {
          //   const data = {
          //     status: "success",
          //     message: "成功取得資料",
          //     data: {
          //       moduleKeywordId: moduleKeyword[0].id,
          //       replyMessage: replyMsg[0].id,
          //       textEvents: _textEvents
          //     }
          //   }
          //   callback(data)
          // } else {
          //   const data = {
          //     status: "success",
          //     message: "資料存取失敗，請稍後再試",
          //   }
          //   callback(data)
          // }
        })
        .catch((err) => {
          console.log(err)
        })

    } catch (err) {
      console.log(err)
    }
  },

  deleteKeywordReply: (req, res, callback) => {
    callback("delete a text event")
  },

}

module.exports = replyMsgService