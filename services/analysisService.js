const db = require('../models')
const ModuleKeyword = db.ModuleKeyword
const ModulePostBack = db.ModulePostBack
const ReplyMessage = db.ReplyMessage


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
  }
}

module.exports = analysisService