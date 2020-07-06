const replyMsgService = require('../../services/replyMsgService')

const replyMsgController = {
  createKeywordReply: (req, res) => {
    return replyMsgService.createKeywordReply(req, res, (data) => {
      return res.json(data)
    })
  },

  getKeywordReply: (req, res) => {
    return replyMsgService.getKeywordReply(req, res, (data) => {
      return res.json(data)
    })
  },

  putKeywordReply: (req, res) => {
    return replyMsgService.putKeywordReply(req, res, (data) => {
      return res.json(data)
    })
  },

  deleteKeywordReply: (req, res) => {
    return replyMsgService.deleteKeywordReply(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = replyMsgController