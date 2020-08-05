'use strict'

const db = require('../models')
const Chatbot = db.Chatbot
const WelcomeMsg = db.WelcomeMsg
const ReplyModule = db.ReplyModule

const welcomeMsgService = {
  // 歡迎訊息設定-取得歡迎訊息資料
  getWelcomeMsg: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.query
      const welcomeMsg = await WelcomeMsg.findOne({
        where: {
          ChatbotId: ChatbotId
        }
      })

      if (welcomeMsg) {
        const data = {
          status: 'success',
          message: '成功取得資料',
          data: {
            welcomeMsg
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
  // 歡迎訊息設定-儲存歡迎訊息資料
  // putWelcomeMsg: async (req, res, callback) => {

  // },
}

module.exports = welcomeMsgService