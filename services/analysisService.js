const db = require('../models')
const ModuleKeyword = db.ModuleKeyword

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
  }
}

module.exports = analysisService