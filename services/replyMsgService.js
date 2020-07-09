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
    const { ChatbotId, moduleKeywordUuid } = req.query

    const moduleKeywordDelete = await ModuleKeyword.destroy({
      where: {
        ChatbotId: parseInt(ChatbotId) ? parseInt(ChatbotId) : null,
        uuid: moduleKeywordUuid ? moduleKeywordUuid : null
      }
    })

    if (moduleKeywordDelete > 0) {
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
    const { ChatbotId, replyMessageUuid } = req.query

    const replyMessageDeleted = await ReplyMessage.destroy({
      where: {
        ChatbotId: parseInt(ChatbotId) ? parseInt(ChatbotId) : null,
        uuid: replyMessageUuid ? replyMessageUuid : null
      }
    })

    if (replyMessageDeleted > 0) {
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
  createTextEvent: async (req, res, callback) => {
    const { ChatbotId } = req.body
    const textEvent = await TextEvent.create({
      uuid: uuidv4(),
      text: '',
      ChatbotId: ChatbotId,
    })
    if (textEvent) {
      callback({
        status: 'success',
        message: '成功建立',
        data: {
          textEvent: textEvent
        }
      })
    } else {
      callback({
        status: 'error',
        message: '新增失敗，請稍後再試'
      })
    }
  },
  // 刪除 text event
  deleteTextEvent: async (req, res, callback) => {
    const { ChatbotId, textEventUuid } = req.query

    console.log('ChatbotId', ChatbotId)
    console.log('textEventUuid', textEventUuid)
    const textEventDeleted = await TextEvent.destroy({
      where: {
        ChatbotId: ChatbotId ? ChatbotId : null,
        uuid: textEventUuid ? textEventUuid : null
      }
    })

    if (textEventDeleted > 0) {
      callback({
        status: 'success',
        message: '成功刪除',
        data: {
          textEventDeleted: textEventDeleted
        }
      })
    } else {
      callback({
        status: 'error',
        message: '刪除失敗，請稍後再試'
      })
    }
  },

  // 儲存關鍵字回覆模組
  postKeywordReply: async (req, res, callback) => {
    const { ChatbotId, module, textEvents, replyMessage } = req.body
    try {
      // 先建立 moduleKeyword
      const moduleKeyword = await ModuleKeyword.findOne({
        where: {
          uuid: module && module.uuid ? module.uuid : null
        }
      })

      //修改並存檔
      if (moduleKeyword) {
        moduleKeyword.name = module && module.name ? module.name : ''
        moduleKeyword.status = module && module.status ? module.status : 'edited'
        moduleKeyword.ChatbotId = ChatbotId
        //存檔
        await moduleKeyword.save()
      }

      console.log('moduleKeyword:', moduleKeyword)
      // 再建立 reply message
      const replyMsg = await ReplyMessage.findOne({
        where: {
          uuid: replyMessage && replyMessage.uuid ? replyMessage.uuid : null
        }
      })

      console.log('replyMsg:', replyMsg)
      //修改並存檔
      if (replyMsg) {
        replyMsg.type = replyMessage && replyMessage.type ? replyMessage.type : null

        replyMsg.name = replyMessage && replyMessage.name ? replyMessage.name : ''

        replyMsg.replyMsgCount = 0
        replyMsg.readMsgCount = 0

        replyMsg.messageTemplate = replyMessage && replyMessage.messageTemplate ? replyMessage.messageTemplate : {}

        replyMsg.status = replyMessage && replyMessage.status ? replyMessage.status : "edited"

        replyMsg.ChatbotId = ChatbotId
        replyMsg.ModuleKeywordId = moduleKeyword.id

        await replyMsg.save()
      }

      // 搜尋 text events
      const createTextEvents = []
      for (i = 0; i < textEvents.length; i++) {
        createTextEvents.push(await TextEvent.findOne({
          where: {
            uuid: textEvents[i] && textEvents[i].uuid ? textEvents[i].uuid : null
          }
        }))
      }

      // 修改並儲存 text events
      Promise.all(createTextEvents)
        .then(async (_textEvents) => {
          console.log('_textEvents:', _textEvents)

          try {
            for (i = 0; i < textEvents.length; i++) {
              if (_textEvents[i]) {
                _textEvents[i].type = textEvents[i] && textEvents[i].type ? textEvents[i].type : 'text'

                _textEvents[i].text = textEvents[i] && textEvents[i].text ? textEvents[i].text : ''

                _textEvents[i].ReplyMessageId = replyMsg && replyMsg.id ? replyMsg.id : null

                _textEvents[i].ChatbotId = ChatbotId

                //存檔
                await _textEvents[i].save()
              }
            }
          } catch (err) {
            const data = {
              status: "success",
              message: "資料存取失敗，請稍後再試",
              error: err.message
            }
            callback(data)
          }
          //存取成功，匯出訊息
          if (moduleKeyword && replyMsg && _textEvents) {
            const data = {
              status: "success",
              message: "資料存取成功",
              data: {
                moduleKeywordId: moduleKeyword,
                replyMessage: replyMsg,
                textEvents: _textEvents
              }
            }
            callback(data)
          }
        })
        .catch((err) => {
          const data = {
            status: "success",
            message: "資料存取失敗，請稍後再試",
            error: err.message
          }
          callback(data)
        })

    } catch (err) {
      const data = {
        status: "error",
        message: "系統錯誤,請稍後重試",
        error: err.message
      }
      callback(data)
    }
  },
  // 取得關鍵字回應模組
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
          status: "error",
          message: "取得資料失敗",
        }
        callback(data)
      }

    } catch (err) {
      const data = {
        status: "error",
        message: "系統錯誤,請稍後重試",
        error: err.message
      }
      callback(data)
    }
  },
  // 刪除關鍵字回應模組
  deleteKeywordReply: async (req, res, callback) => {
    try {
      const { ChatbotId, module, textEvents, replyMessage } = req.body
      // try {
      // 尋找 moduleKeyword
      const moduleKeyword = await ModuleKeyword.findOne({
        where: {
          uuid: module && module.uuid ? module.uuid : null
        }
      })
      console.log('moduleKeyword:', moduleKeyword)

      // 刪除 moduleKeyword
      if (moduleKeyword) {
        moduleKeyword.status = 'archived'
        //刪除
        await moduleKeyword.destroy()
      }

      // 尋找 reply message
      const replyMsg = await ReplyMessage.findOne({
        where: {
          uuid: replyMessage && replyMessage.uuid ? replyMessage.uuid : null
        }
      })

      console.log('replyMsg:', replyMsg)
      // 刪除 reply message
      if (replyMsg) {
        replyMsg.status = "archived"
        //刪除
        await replyMsg.destroy()
      }

      if (!moduleKeyword || !replyMsg) {
        const data = {
          status: "error",
          message: "存取異常，請稍後再試",
          error: err.message
        }
        callback(data)
      } else {
        const data = {
          status: "error",
          message: "存取成功",
        }
        callback(data)
      }
    } catch (err) {
      const data = {
        status: "error",
        message: "系統錯誤,請稍後重試",
        error: err.message
      }
      callback(data)
    }

  }
}
module.exports = replyMsgService