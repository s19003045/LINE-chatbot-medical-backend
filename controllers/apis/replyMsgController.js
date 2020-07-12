const replyMsgService = require('../../services/replyMsgService')

const replyMsgController = {
  // 新增 module keyword
  createModuleKeyword: (req, res) => {
    return replyMsgService.createModuleKeyword(req, res, (data) => {
      return res.json(data)
    })
  },
  // 刪除 module keyword
  deleteModuleKeyword: (req, res) => {
    return replyMsgService.deleteModuleKeyword(req, res, (data) => {
      return res.json(data)
    })
  },
  // 新增 reply message
  createReplyMessage: (req, res) => {
    return replyMsgService.createReplyMessage(req, res, (data) => {
      return res.json(data)
    })
  },
  // 刪除 reply message
  deleteReplyMessage: (req, res) => {
    return replyMsgService.deleteReplyMessage(req, res, (data) => {
      return res.json(data)
    })
  },
  // 新增 text event
  createTextEvent: (req, res) => {
    return replyMsgService.createTextEvent(req, res, (data) => {
      return res.json(data)
    })
  },
  // 刪除 text event
  deleteTextEvent: (req, res) => {
    return replyMsgService.deleteTextEvent(req, res, (data) => {
      return res.json(data)
    })
  },


  // 儲存關鍵字回應模組
  postKeywordReply: (req, res) => {
    return replyMsgService.postKeywordReply(req, res, (data) => {
      return res.json(data)
    })
  },
  // 取得關鍵字回應模組
  getKeywordReply: (req, res) => {
    return replyMsgService.getKeywordReply(req, res, (data) => {
      return res.json(data)
    })
  },
  // 刪除關鍵字回應模組
  deleteKeywordReply: (req, res) => {
    return replyMsgService.deleteKeywordReply(req, res, (data) => {
      return res.json(data)
    })
  },

  // 取得回傳動作(postback)回應模組
  getPostBackReply: (req, res) => {
    return replyMsgService.getPostBackReply(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = replyMsgController