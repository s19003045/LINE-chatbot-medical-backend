const db = require("../models")
const TextEvent = db.TextEvent
const ReplyMessage = db.ReplyMessage
const ModuleKeyword = db.ModuleKeyword
const ModulePostBack = db.ModulePostBack
const PostBackEvent = db.PostBackEvent
const Keyword = db.Keyword
const KeywordUser = db.KeywordUser
const ReplyModule = db.ReplyModule

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
        ChatbotId: ChatbotId ? ChatbotId : null,
        uuid: moduleKeywordUuid ? moduleKeywordUuid : null
      }
    })

    if (moduleKeywordDelete > 0) {
      return callback({
        status: 'success',
        message: '成功刪除模組',
        data: null
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
      const { ChatbotId } = req.body

      //驗證資料正確性
      if (!ChatbotId) {
        return callback({
          status: 'error',
          message: '新增失敗，請確認資料正確性'
        })
      }

      const keywordCreate = await Keyword.create({
        name: '',
        uuid: uuidv4(),
        ChatbotId: ChatbotId,
        triggerModuleId: null
      })

      if (keywordCreate) {
        return callback({
          status: 'success',
          message: '存取成功',
          data: {
            keyword: keywordCreate
          }
        })
      } else {
        return callback({
          status: 'error',
          message: '存取失敗，請稍後再試'
        })
      }
    } catch (err) {
      return callback({
        status: 'error',
        message: '系統異常，請稍後再試',
        err: err
      })
    }
  },
  // 取得關鍵字
  getKeywords: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.query

      //驗證資料正確性
      if (!ChatbotId) {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }

      //搜尋資料
      const keywordsFind = await Keyword.findAll({
        where: {
          ChatbotId: ChatbotId
        },
        include: [
          {
            model: ReplyModule
          }
        ]
      })

      if (keywordsFind) {
        return callback({
          status: 'success',
          message: '成功存取',
          data: {
            keywords: keywordsFind
          }
        })
      } else {
        return callback({
          status: 'error',
          message: '存取失敗，請稍後再試',
        })
      }
    } catch (err) {
      return callback({
        status: 'error',
        message: '系統異常，請稍後再試',
        err: err
      })
    }
  },
  // 刪除關鍵字
  deleteKeyword: async (req, res, callback) => {
    try {
      const { ChatbotId, keywordUuid } = req.query

      //驗證資料正確性
      if (!ChatbotId || !keywordUuid) {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }
      //搜尋資料
      const keywordFind = await Keyword.findOne({
        where: {
          ChatbotId: ChatbotId,
          uuid: keywordUuid
        }
      })
      //刪除資料
      if (keywordFind) {
        keywordFind.destroy()
          .then(() => {
            return callback({
              status: 'success',
              message: '存取成功',
              data: null
            })
          })
      } else {
        return callback({
          status: 'error',
          message: '存取失敗，請稍後再試',
        })
      }
    } catch (err) {
      return callback({
        status: 'error',
        message: '系統異常，請稍後再試',
      })
    }
  },
  // 儲存關鍵字
  putKeyword: async (req, res, callback) => {
    try {
      const { ChatbotId, keywords, action } = req.body

      //驗證資料正確性
      if (!ChatbotId || !keywords || !action) {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }

      const keywordsUpdateQuery = []

      // keyword 的狀態由前端控制 'edited' 或 'in-use'
      for (let i = 0; i < keywords.length; i++) {
        keywordsUpdateQuery.push(await Keyword.update({
          name: keywords[i].name ? keywords[i].name : '',
          status: keywords[i].status ? keywords[i].status : 'edited',
          triggerModuleId: keywords[i].triggerModuleId ? keywords[i].triggerModuleId : null
        }, {
          where: {
            ChatbotId: ChatbotId,
            uuid: keywords[i].uuid,
          }
        }))
      }

      return Promise.all(keywordsUpdateQuery)
        .then(res => {
          return callback({
            status: 'success',
            message: '存取成功',
            data: res
          })
        })
        .catch(err => {
          return callback({
            status: 'error',
            message: '存取失敗，請稍後再試',
            err: err
          })
        })
    } catch (err) {
      return callback({
        status: 'error',
        message: '系統異常，請稍後再試',
        err: err
      })
    }
  },


  // 新增 replyModule
  createReplyModule: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.body

      //驗證資料正確性
      if (!ChatbotId) {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }

      const replyModuleCreate = await ReplyModule.create({
        name: '',
        uuid: uuidv4(),
        status: 'edited',
        ChatbotId: ChatbotId,
        replyMessage: []
      })

      if (replyModuleCreate) {
        return callback({
          status: 'success',
          message: '成功存取',
          data: {
            replyModule: replyModuleCreate
          }
        })
      } else {
        return callback({
          status: 'error',
          message: '存取失敗，請稍後再試',
        })
      }

    } catch (err) {
      return callback({
        status: 'error',
        message: '系統異常，請稍後再試',
      })
    }
  },
  // 取得 replyModules
  getReplyModules: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.query

      //驗證資料正確性
      if (!ChatbotId) {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }

      const replyModules = await ReplyModule.findAll({
        where: {
          ChatbotId: ChatbotId,
        },
        include: [
          {
            model: Keyword
          }
        ]
      })

      if (replyModules) {
        return callback({
          status: 'success',
          message: '成功存取資料',
          data: {
            replyModules: replyModules
          }
        })
      } else {
        return callback({
          status: 'error',
          message: '存取失敗，請稍後再試',
        })
      }

    } catch (err) {
      return callback({
        status: 'error',
        message: '系統異常，請稍後再試',
      })
    }
  },
  // 刪除 replyModule
  deleteReplyModule: async (req, res, callback) => {
    try {
      const { ChatbotId, ReplyModuleUuid } = req.query

      //驗證資料正確性
      if (!ChatbotId || !ReplyModuleUuid) {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }
      //先找出該筆資料
      const replyModule = await ReplyModule.findOne({
        where: {
          uuid: ReplyModuleUuid,
          ChatbotId: ChatbotId ? ChatbotId : null,
        }
      })

      if (replyModule) {
        //變更 status
        replyModule.status = 'archived'
        // soft delete
        const replyModuleDelete = await replyModule.destroy()

        if (replyModuleDelete) {
          return callback({
            status: 'success',
            message: '成功存取資料',
            data: null
          })
        } else {
          return callback({
            status: 'error',
            message: '存取失敗，請稍後再試',
          })
        }
      } else {
        return callback({
          status: 'error',
          message: '存取失敗，請稍後再試',
        })
      }
    } catch (err) {
      return callback({
        status: 'error',
        message: '系統異常，請稍後再試',
      })
    }
  },
  // 儲存 replyModule
  putReplyModule: async (req, res, callback) => {
    try {
      const { ChatbotId, replyModules, action } = req.body

      //驗證資料正確性
      if (!ChatbotId || !replyModules || !action) {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }

      const replyModulesUpdateQuery = []
      // 若 action 為 'edited'，則不改變 replyModule.status，若 action 為 'deploy'，則改變 replyModule.status 為 in-use
      if (action === 'edited') {
        for (let i = 0; i < replyModules.length; i++) {
          replyModulesUpdateQuery.push(await ReplyModule.update({
            name: replyModules[i].name,
            replyMessage: replyModules[i].replyMessage,
          }, {
            where: {
              ChatbotId: ChatbotId,
              uuid: replyModules[i].uuid,
            }
          }))
        }
      } else if (action === 'deploy') {
        for (let i = 0; i < replyModules.length; i++) {
          replyModulesUpdateQuery.push(await ReplyModule.update({
            name: replyModules[i].name,
            replyMessage: replyModules[i].replyMessage,
            status: 'in-use'
          }, {
            where: {
              ChatbotId: ChatbotId,
              uuid: replyModules[i].uuid,
            }
          }))
        }
      } else {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }

      Promise.all(replyModulesUpdateQuery)
        .then(res => {
          return callback({
            status: 'success',
            message: '存取成功',
            data: res
          })
        })
        .catch(err => {
          return callback({
            status: 'error',
            message: '存取失敗，請稍後再試',
            err: err
          })
        })
    } catch (err) {
      return callback({
        status: 'error',
        message: '系統異常，請稍後再試',
        err: err
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
        attributes: ['name', 'uuid', 'status'],
        include: [
          {
            model: ReplyMessage,
            attributes: ['type', 'name', 'uuid', 'messageTemplate', 'status']
          }, {
            model: TextEvent,
            attributes: ['type', 'uuid', 'text']
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

      const modulePostBacks = await ModulePostBack.findAll({
        where: {
          ChatbotId: ChatbotId
        },
        attributes: [
          "name", "uuid", "status",
        ],
        include: [
          {
            model: ReplyMessage,
            attributes: ['type', 'name', 'uuid', 'messageTemplate', 'status']
          },
          {
            model: PostBackEvent,
            attributes: ['name', 'eventType', 'uuid', 'subject', 'data']
          },
        ]
      })

      if (modulePostBacks) {
        const data = {
          status: "success",
          message: "成功取得資料",
          data: {
            modulePostBacks: modulePostBacks
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
  // 新增 postback module
  createModulePostBack: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.body

      //驗證資料正確性
      if (!ChatbotId) {
        return callback({
          status: 'error',
          message: '新增失敗，請確認資料正確性'
        })
      }

      const modulePostBackCreate = await ModulePostBack.create({
        name: '',
        uuid: uuidv4(),
        status: 'in-use',
        ChatbotId: ChatbotId,
      })

      if (modulePostBackCreate) {
        const moduleKeyword = {
          name: modulePostBackCreate.name,
          uuid: modulePostBackCreate.uuid,
          status: modulePostBackCreate.status,
          ReplyMessage: {},
          PostBackEvents: []
        }

        return callback({
          status: 'success',
          message: '成功建立模組',
          data: {
            modulePostBack: modulePostBackCreate
          }
        })
      } else {
        return callback({
          status: 'failed',
          message: '新增模組失敗，請稍後再試'
        })
      }
    } catch (err) {
      return callback({
        status: 'failed',
        message: '新增模組失敗，請稍後再試'
      })
    }
  },
  // 刪除 postback module
  deleteModulePostBack: async (req, res, callback) => {
    const { ChatbotId, modulePostBackUuid } = req.query

    //驗證資料正確性
    if (!ChatbotId || !modulePostBackUuid) {
      return callback({
        status: 'error',
        message: '新增失敗，請確認資料正確性'
      })
    }

    const modulePostBackDelete = await ModulePostBack.destroy({
      where: {
        ChatbotId: ChatbotId ? ChatbotId : null,
        uuid: modulePostBackUuid ? modulePostBackUuid : null
      }
    })

    if (modulePostBackDelete > 0) {
      return callback({
        status: 'success',
        message: '成功刪除模組',
        data: null
      })
    } else {
      return callback({
        status: 'failed',
        message: '刪除模組失敗，請稍後再試'
      })
    }
  },
  // 儲存回傳動作(postback)回應模組
  postPostBackReply: async (req, res, callback) => {
    try {
      let { ChatbotId, module, postBackEvents, replyMessage } = req.body

      replyMessage = replyMessage ? replyMessage : {}
      postBackEvents = postBackEvents ? postBackEvents : []

      //驗證資料正確性
      if (!ChatbotId || !module || !replyMessage || !postBackEvents) {
        return callback({
          status: 'error',
          message: '存取失敗，請確認資料正確性'
        })
      }

      // modulePostBack於使用者點選新增模組時，即向 API 請求建立一筆並回傳 uuid 等資訊
      // 先確認 modulePostBack 是否已建立
      const modulePostBack = await ModulePostBack.findOne({
        where: {
          uuid: module && module.uuid ? module.uuid : null
        },
        attributes: ['id', 'name', 'uuid']
      })

      let _modulePostBack
      //修改並存檔
      if (modulePostBack) {
        modulePostBack.name = module && module.name ? module.name : ''
        modulePostBack.status = module && module.status ? module.status : 'in-use'
        modulePostBack.uuid = uuidv4() //新的 uuid
        //存檔
        _modulePostBack = await modulePostBack.save()
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
        ModulePostBackId: _modulePostBack.id,
        modulePostBackUuid: _modulePostBack.uuid
      })

      //刪除舊有的 replyMessage 資料
      const replyMsgDestroy = await ReplyMessage.destroy({
        where: {
          modulePostBackUuid: module.uuid
        }
      })


      //重新建立 postBackEvents
      const createPostBackEvents = []
      for (i = 0; i < postBackEvents.length; i++) {
        createPostBackEvents.push(await PostBackEvent.create({
          name: postBackEvents[i].name ? postBackEvents[i].name : '',
          eventType: postBackEvents[i].eventType ? postBackEvents[i].eventType : '',
          uuid: uuidv4(),
          subject: postBackEvents[i].subject ? postBackEvents[i].subject : '',
          data: postBackEvents[i].data ? postBackEvents[i].data : '',
          ReplyMessageId: replyMsgCreate.id,
          ChatbotId: ChatbotId,
          ModulePostBackId: _modulePostBack.id,
          modulePostBackUuid: _modulePostBack.uuid
        }))
      }

      //刪除舊有的 postBackEvents 資料
      const postBackEventsDestroy = await PostBackEvent.destroy({
        where: {
          modulePostBackUuid: module.uuid,
        }
      })

      // 修改並儲存 postBackEvents
      Promise.all(createPostBackEvents)
        .then(async (_postBackEvents) => {
          //存取成功，匯出訊息
          if (_modulePostBack && replyMsgCreate && _postBackEvents) {
            const data = {
              status: "success",
              message: "資料存取成功",
              data: {
                modulePostBack: _modulePostBack,
                replyMessage: replyMsgCreate,
                postBackEvents: _postBackEvents
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

}
module.exports = replyMsgService