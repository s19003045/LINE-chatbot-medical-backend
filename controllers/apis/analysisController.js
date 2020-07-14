const analysisService = require('../../services/analysisService')

const analysisController = {
  // 分析模組-取得關鍵字模組使用數據
  getModuleKeywordAnalysis: (req, res) => {
    return analysisService.getModuleKeywordAnalysis(req, res, (data) => {
      return res.json(data)
    })
  }
}

module.exports = analysisController