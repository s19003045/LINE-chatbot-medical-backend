const db = require('../models')
const ModuleKeyword = db.ModuleKeyword
const ModulePostBack = db.ModulePostBack
const ReplyMessage = db.ReplyMessage
const ReplyModule = db.ReplyModule
const Keyword = db.Keyword
const LineUser = db.LineUser
const Chatbot = db.Chatbot

const analysisService = {
  // 分析模組-取得關鍵字模組使用數據
  getModuleKeywordAnalysis: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.query
      const keywordAnalysis = await ModuleKeyword.findAll({
        where: {
          ChatbotId: ChatbotId
        }
      })

      if (keywordAnalysis) {
        const data = {
          status: 'success',
          message: '成功取得資料',
          data: {
            keywordAnalysis
          }
        }
        callback(data)
      } else {
        const data = {
          status: 'error',
          message: '存取失敗'
        }
        callback(data)
      }

    } catch (err) {
      const data = {
        status: 'error',
        message: '存取失敗'
      }
      callback(data)
    }
  },
  // 分析模組-取得postback模組使用數據
  getModulePostBackAnalysis: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.query
      const postBackAnalysis = await ModulePostBack.findAll({
        where: {
          ChatbotId: ChatbotId
        }
      })

      if (postBackAnalysis) {
        const data = {
          status: 'success',
          message: '成功取得資料',
          data: {
            postBackAnalysis
          }
        }
        callback(data)
      } else {
        const data = {
          status: 'error',
          message: '存取失敗'
        }
        callback(data)
      }

    } catch (err) {
      const data = {
        status: 'error',
        message: '存取失敗'
      }
      callback(data)
    }
  },
  // 分析模組-取得關鍵字模組使用數據
  getReplyMessageAnalysis: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.query
      const replyMsgAnalysis = await ReplyMessage.findAll({
        where: {
          ChatbotId: ChatbotId
        }
      })

      if (replyMsgAnalysis) {
        const data = {
          status: 'success',
          message: '成功取得資料',
          data: {
            replyMsgAnalysis
          }
        }
        callback(data)
      } else {
        const data = {
          status: 'error',
          message: '存取失敗'
        }
        callback(data)
      }

    } catch (err) {
      const data = {
        status: 'error',
        message: '存取失敗'
      }
      callback(data)
    }
  },
  // 分析模組-取得回應模組(replyModule)使用數據
  getReplyModuleAnalysis: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.query
      const { botId } = req.params

      // 驗證身份
      const chatbot = await Chatbot.findOne({
        where: {
          id: ChatbotId,
          botId: botId
        }
      })

      if (!chatbot) {
        throw new Error('請確認資料正確性')
      }

      if (chatbot) {
        const replyModules = await ReplyModule.findAll({
          where: {
            ChatbotId: chatbot.id
          }
        })

        if (replyModules) {
          const data = {
            status: 'success',
            message: '成功取得資料',
            data: {
              replyModules: replyModules
            }
          }
          callback(data)
        } else {
          const data = {
            status: 'success',
            message: '使用者尚未建立任何任何回應模組',
            data: {
              replyModules: replyModules
            }
          }
          callback(data)
        }
      }
    } catch (err) {
      const data = {
        status: 'error',
        message: '存取失敗',
        error: err.message
      }
      callback(data)
    }
  },
  // 分析模組-取得關鍵字使用數據
  getKeywordAnalysis: async (req, res, callback) => {
    try {
      callback('getKeywordAnalysis')
    } catch (err) {
      const data = {
        status: 'error',
        message: '存取失敗',
        error: err.message
      }
      callback(data)
    }
  },
  // 分析模組-取得將機器人加為好友的使用者數據
  getUserAnalysis: async (req, res, callback) => {
    try {
      callback('getUserAnalysis')
    } catch (err) {
      const data = {
        status: 'error',
        message: '存取失敗',
        error: err.message
      }
      callback(data)
    }
  },
}

module.exports = analysisService