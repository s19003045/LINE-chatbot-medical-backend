const analysisService = require('../../services/analysisService')

const analysisController = {
  // 分析模組-取得關鍵字模組使用數據
  getModuleKeywordAnalysis: (req, res) => {
    return analysisService.getModuleKeywordAnalysis(req, res, (data) => {
      return res.json(data)
    })
  },
  // 分析模組-取得postback模組使用數據
  getModulePostBackAnalysis: (req, res) => {
    return analysisService.getModulePostBackAnalysis(req, res, (data) => {
      return res.json(data)
    })
  },
  // 分析模組-取得關鍵字模組使用數據
  getReplyMessageAnalysis: (req, res) => {
    return analysisService.getReplyMessageAnalysis(req, res, (data) => {
      return res.json(data)
    })
  },
  // 分析模組-取得回應模組(replyModule)使用數據
  getReplyModuleAnalysis: (req, res) => {
    return analysisService.getReplyModuleAnalysis(req, res, (data) => {
      return res.json(data)
    })
  },
  // 分析模組-取得關鍵字使用數據
  getKeywordAnalysis: (req, res) => {
    return analysisService.getKeywordAnalysis(req, res, (data) => {
      return res.json(data)
    })
  },
  // 分析模組-取得將機器人加為好友的使用者數據
  getUserAnalysis: (req, res) => {
    return analysisService.getUserAnalysis(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = analysisController