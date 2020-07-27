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


  //========= keyword =========
  // 新增關鍵字
  createKeyword: (req, res) => {
    return replyMsgService.createKeyword(req, res, (data) => {
      return res.json(data)
    })
  },
  // 取得關鍵字
  getKeywords: (req, res) => {
    return replyMsgService.getKeywords(req, res, (data) => {
      return res.json(data)
    })
  },
  // 刪除關鍵字
  deleteKeyword: (req, res) => {
    return replyMsgService.deleteKeyword(req, res, (data) => {
      return res.json(data)
    })
  },
  // 儲存關鍵字
  putKeyword: (req, res) => {
    return replyMsgService.putKeyword(req, res, (data) => {
      return res.json(data)
    })
  },

  //========= replyModule =========
  // 新增 replyModule
  createReplyModule: (req, res) => {
    return replyMsgService.createReplyModule(req, res, (data) => {
      return res.json(data)
    })
  },
  // 取得 replyModules
  getReplyModules: (req, res) => {
    return replyMsgService.getReplyModules(req, res, (data) => {
      return res.json(data)
    })
  },
  // 刪除 replyModule
  deleteReplyModule: (req, res) => {
    return replyMsgService.deleteReplyModule(req, res, (data) => {
      return res.json(data)
    })
  },
  // 儲存 replyModule
  putReplyModule: (req, res) => {
    return replyMsgService.putReplyModule(req, res, (data) => {
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

  // 新增 postback module
  createModulePostBack: (req, res) => {
    return replyMsgService.createModulePostBack(req, res, (data) => {
      return res.json(data)
    })
  },
  // 刪除 postback module
  deleteModulePostBack: (req, res) => {
    return replyMsgService.deleteModulePostBack(req, res, (data) => {
      return res.json(data)
    })
  },
  // 取得回傳動作(postback)回應模組
  getPostBackReply: (req, res) => {
    return replyMsgService.getPostBackReply(req, res, (data) => {
      return res.json(data)
    })
  },
  // 儲存回傳動作(postback)回應模組
  postPostBackReply: (req, res) => {
    return replyMsgService.postPostBackReply(req, res, (data) => {
      return res.json(data)
    })
  },

}

module.exports = replyMsgController