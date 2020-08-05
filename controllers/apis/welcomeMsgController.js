'use strict'

const welcomeMsgService = require('../../services/welcomeMsgService')

const welcomeMsgController = {
  // 歡迎訊息設定-取得歡迎訊息資料
  getWelcomeMsg: (req, res) => {
    return welcomeMsgService.getWelcomeMsg(req, res, (data) => {
      return res.json(data)
    })
  },
  // 歡迎訊息設定-儲存歡迎訊息資料
  putWelcomeMsg: (req, res) => {
    return welcomeMsgService.putWelcomeMsg(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = welcomeMsgController