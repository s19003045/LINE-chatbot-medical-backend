const db = require("../models")
const TextEvent = db.TextEvent
const ReplyMessage = db.ReplyMessage
const ModuleKeyword = db.ModuleKeyword
const ModulePostBack = db.ModulePostBack
const PostBackEvent = db.PostBackEvent
const Keyword = db.Keyword
const KeywordUser = db.KeywordUser


const { v4: uuidv4 } = require("uuid");
const client = require("../app");


const replyMsgService = {
  // 新增 module keyword
  createModuleKeyword: async (req, res, callback) => {
    const { ChatbotId } = req.body

    //驗證資料正確性
    if (!ChatbotId) {
      return callback({
        status: 'error',
        message: '新增失敗，請確認資料正確性'
      })
    }

    const moduleKeywordCreate = await ModuleKeyword.create({
      name: '',
      uuid: uuidv4(),
      status: 'in-use',
      ChatbotId: ChatbotId,
    })

    if (moduleKeywordCreate) {
      const moduleKeyword = {
        name: moduleKeywordCreate.name,
        uuid: moduleKeywordCreate.uuid,
        status: moduleKeywordCreate.status,
        ReplyMessage: {},
        TextEvents: []
      }

      return callback({
        status: 'success',
        message: '成功建立模組',
        data: {
          moduleKeyword: moduleKeyword
        }
      })
    } else {
      return callback({
        status: 'failed',
        message: '新增模組失敗，請稍後再試'
      })
    }
  },
  // 刪除 module keyword
  deleteModuleKeyword: async (req, res, callback) => {
    const { ChatbotId, moduleKeywordUuid } = req.query

    //驗證資料正確性
    if (!ChatbotId || !moduleKeywordUuid) {
      return callback({
        status: 'error',
        message: '新增失敗，請確認資料正確性'
      })
    }

    const moduleKeywordDelete = await ModuleKeyword.destroy({
      where: {
        ChatbotId: parseInt(ChatbotId) ? parseInt(ChatbotId) : null,
        uuid: moduleKeywordUuid ? moduleKeywordUuid : null
      }
    })

    if (moduleKeywordDelete > 0) {
      return callback({
        status: 'success',
        message: '成功刪除模組',
        data: {
          moduleKeywordDelete: moduleKeywordDelete
        }
      })
    } else {
      return callback({
        status: 'failed',
        message: '刪除模組失敗，請稍後再試'
      })
    }
  },
  // 新增 reply message
  createReplyMessage: async (req, res, callback) => {
    const { ChatbotId } = req.body

    //驗證資料正確性
    if (!ChatbotId) {
      return callback({
        status: 'error',
        message: '新增失敗，請確認資料正確性'
      })
    }

    const replyMessage = await ReplyMessage.create({
      name: '',
      uuid: uuidv4(),
      status: 'edited',
      ChatbotId: ChatbotId,
    })

    if (replyMessage) {
      return callback({
        status: 'success',
        message: '成功新增',
        data: {
          replyMessage: replyMessage
        }
      })
    } else {
      return callback({
        status: 'error',
        message: '新增失敗，請稍後再試'
      })
    }
  },
  // 刪除 reply message
  deleteReplyMessage: async (req, res, callback) => {
    const { ChatbotId, replyMessageUuid } = req.query

    //驗證資料正確性
    if (!ChatbotId || !replyMessageUuid) {
      return callback({
        status: 'error',
        message: '新增失敗，請確認資料正確性'
      })
    }

    const replyMessageDeleted = await ReplyMessage.destroy({
      where: {
        ChatbotId: parseInt(ChatbotId) ? parseInt(ChatbotId) : null,
        uuid: replyMessageUuid ? replyMessageUuid : null
      }
    })

    if (replyMessageDeleted > 0) {
      return callback({
        status: 'success',
        message: '成功刪除',
        data: {
          replyMessageDeleted: replyMessageDeleted
        }
      })
    } else {
      return callback({
        status: 'error',
        message: '刪除失敗，請稍後再試'
      })
    }
  },
  // 新增 text event
  createTextEvent: async (req, res, callback) => {
    const { ChatbotId } = req.body

    //驗證資料正確性
    if (!ChatbotId) {
      return callback({
        status: 'error',
        message: '新增失敗，請確認資料正確性'
      })
    }

    const textEvent = await TextEvent.create({
      uuid: uuidv4(),
      text: '',
      ChatbotId: ChatbotId,
    })

    if (textEvent) {
      return callback({
        status: 'success',
        message: '成功建立',
        data: {
          textEvent: textEvent
        }
      })
    } else {
      return callback({
        status: 'error',
        message: '新增失敗，請稍後再試'
      })
    }
  },
  // 刪除 text event
  deleteTextEvent: async (req, res, callback) => {
    const { ChatbotId, textEventUuid } = req.query

    //驗證資料正確性
    if (!ChatbotId || !textEventUuid) {
      return callback({
        status: 'error',
        message: '新增失敗，請確認資料正確性'
      })
    }

    const textEventDeleted = await TextEvent.destroy({
      where: {
        ChatbotId: ChatbotId ? ChatbotId : null,
        uuid: textEventUuid ? textEventUuid : null
      }
    })

    if (textEventDeleted > 0) {
      return callback({
        status: 'success',
        message: '成功刪除',
        data: {
          textEventDeleted: textEventDeleted
        }
      })
    } else {
      return callback({
        status: 'error',
        message: '刪除失敗，請稍後再試'
      })
    }
  },

  // 新增關鍵字
  createKeyword: async (req, res, callback) => {
    try {
      const { ChatbotId, keywordName } = req.body

      //驗證資料正確性
      if (!ChatbotId || !keywordName || keywordName === '') {
        return callback({
          status: 'error',
          message: '新增失敗，請確認資料正確性'
        })
      }

      const keywordFind = await Keyword.findOne({
        where: {
          ChatbotId: ChatbotId,
          name: keywordName
        }
      })

      if (keywordFind) {
        return callback({
          status: 'error',
          message: '已有此關鍵字',
          data: {
            keywordFind: keywordFind
          }
        })
      } else {
        return Keyword.create({
          ChatbotId: ChatbotId,
          name: keywordName
        })
          .then(keyword => {
            if (keyword) {
              return callback({
                status: 'success',
                message: '成功建立關鍵字',
                data: {
                  keyword: keyword
                }
              })
            } else {
              return callback({
                status: 'error',
                message: '建立失敗，請稍後再試',
              })
            }
          })
      }
    } catch (err) {
      return callback({
        status: 'error',
        message: '建立失敗，請稍後再試',
      })
    }
  },

  // 儲存關鍵字回覆模組
  postKeywordReply: async (req, res, callback) => {
    try {
      let { ChatbotId, module, textEvents, replyMessage } = req.body

      replyMessage = replyMessage ? replyMessage : {}
      textEvents = textEvents ? textEvents : []

      //驗證資料正確性
      if (!ChatbotId || !module || !replyMessage || !textEvents) {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }

      // moduleKeyword於使用者點選新增模組時，即向 API 請求建立一筆並回傳 uuid 等資訊
      // 先確認 moduleKeyword 是否已建立
      const moduleKeyword = await ModuleKeyword.findOne({
        where: {
          uuid: module && module.uuid ? module.uuid : null
        },
        attributes: ['id', 'name', 'uuid', 'status']
      })

      let _moduleKeyword
      //修改並存檔
      if (moduleKeyword) {
        moduleKeyword.name = module && module.name ? module.name : ''
        moduleKeyword.status = module && module.status ? module.status : 'in-use'
        moduleKeyword.uuid = uuidv4() //新的 uuid
        //存檔
        _moduleKeyword = await moduleKeyword.save()
      } else {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }

      //使用新的 module uuid 來建立 replyMessage
      //重新建立 replyMessage
      const replyMsgCreate = await ReplyMessage.create({
        type: replyMessage.type ? replyMessage.type : '',
        name: replyMessage.name ? replyMessage.name : '',
        uuid: uuidv4(),
        // replyMsgCount: 0, //之後用不到
        // readMsgCount: 0, //之後用不到
        messageTemplate: replyMessage.messageTemplate ? replyMessage.messageTemplate : {},
        status: 'in-use',
        ChatbotId: ChatbotId,
        ModuleKeywordId: _moduleKeyword.id,
        moduleKeywordUuid: _moduleKeyword.uuid
      })

      //刪除舊有的 replyMessage 資料
      const replyMsgDestroy = await ReplyMessage.destroy({
        where: {
          moduleKeywordUuid: module.uuid
        }
      })

      //建立 keyword
      const keywordsCreate = []
      for (let i = 0; i < textEvents.length; i++) {
        keywordsCreate.push(await Keyword.findOrCreate({
          where: {
            name: textEvents[i].text,
            ChatbotId: ChatbotId,
            UsedCount: 0
          }
        }))
      }

      //重新建立 textEvents
      const createTextEvents = []
      for (i = 0; i < textEvents.length; i++) {
        createTextEvents.push(await TextEvent.create({
          type: textEvents[i].type ? textEvents[i].type : '',
          uuid: uuidv4(),
          text: textEvents[i].text ? textEvents[i].text : '',
          ReplyMessageId: replyMsgCreate.id,
          ChatbotId: ChatbotId,
          ModuleKeywordId: _moduleKeyword.id,
          moduleKeywordUuid: _moduleKeyword.uuid
        }))
      }

      //刪除舊有的 textEvents 資料
      const textEventsDestroy = await TextEvent.destroy({
        where: {
          moduleKeywordUuid: module.uuid,
        }
      })

      // 修改並儲存 text events
      Promise.all(createTextEvents)
        .then(async (_textEvents) => {
          //存取成功，匯出訊息
          if (_moduleKeyword && replyMsgCreate && _textEvents) {
            const data = {
              status: "success",
              message: "資料存取成功",
              data: {
                moduleKeyword: _moduleKeyword,
                replyMessage: replyMsgCreate,
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
          }, {
            model: TextEvent
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

  },

  // 取得回傳動作(postback)回應模組
  getPostBackReply: async (req, res, callback) => {
    try {

      const { ChatbotId } = req.query
      console.log('ChatbotId:', ChatbotId)

      const modulePostBack = await ModulePostBack.findAll({
        where: {
          ChatbotId: ChatbotId
        },
        include: [
          {
            model: PostBackEvent
          }, {
            model: ReplyMessage
          }
        ]
      })

      if (modulePostBack) {
        const data = {
          status: "success",
          message: "成功取得資料",
          data: {
            modulePostBack: modulePostBack
          }
        }
        callback(data)
      } else {
        const data = {
          status: "success",
          message: "存取異常，請稍後再試",
        }
        callback(data)
      }
    } catch (err) {
      console.log(err)
      const data = {
        status: "success",
        message: "系統異常，請稍後再試",
        error: err.message
      }
      callback(data)
    }


  },
}
module.exports = replyMsgService