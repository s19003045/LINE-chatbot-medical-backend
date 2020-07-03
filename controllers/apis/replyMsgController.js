const replyMsgService = require('../../services/replyMsgService')

const replyMsgController = {
  createTextEvent: (req, res) => {
    return replyMsgService.createTextEvent(req, res, (data) => {
      return res.json(data)
    })
  },

  getTextEvents: (req, res) => {
    return replyMsgService.getTextEvents(req, res, (data) => {
      return res.json(data)
    })
  },

  putTextEvent: (req, res) => {
    return replyMsgService.putTextEvent(req, res, (data) => {
      return res.json(data)
    })
  },

  deleteTextEvent: (req, res) => {
    return replyMsgService.deleteTextEvent(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = replyMsgController