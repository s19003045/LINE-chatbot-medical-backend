'use strict'

const db = require('../models')
const Chatbot = db.Chatbot
const WelcomeMsg = db.WelcomeMsg
const ReplyModule = db.ReplyModule
// LINE default welcome message
const welcomeMsgSchema = require('../templates/welcomeMsg/welcomeMsgSchema.json')

// import helper
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");


const welcomeMsgService = {
  // 歡迎訊息設定-取得歡迎訊息資料
  getWelcomeMsg: async (req, res, callback) => {
    try {
      const { ChatbotId } = req.query

      //  把 status 為 'edited'及'in-use'的資料都給前端，讓使用者自行決定是否啟用自訂歡迎訊息
      const welcomeMsg = await WelcomeMsg.findOne({
        where: {
          ChatbotId: ChatbotId,
          [Op.or]: [{ status: 'edited' }, { status: 'in-use' }],
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
        // 使用者若無自訂歡迎訊息，則建立一個
        const welcomeMsgeCreate = await WelcomeMsg.create({
          name: '歡迎訊息',
          uuid: uuidv4(),
          status: 'edited',
          replyMessage: welcomeMsgSchema,
          ChatbotId: ChatbotId
        })

        const data = {
          status: 'success',
          message: '使用者無自訂歡迎訊息。提供 LINE 官方預設訯迎訊息',
          data: {
            welcomeMsg: welcomeMsgeCreate
          }
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
  putWelcomeMsg: async (req, res, callback) => {
    try {
      // parse req
      const { botId } = req.params
      const { ChatbotId, welcomeMsg } = req.body

      // find data
      const welcomeMsgFind = await WelcomeMsg.findOne({
        where: {
          ChatbotId: ChatbotId,
          id: welcomeMsg.id,
          uuid: welcomeMsg.uuid
        }
      })

      if (welcomeMsgFind) {
        // update data
        welcomeMsgFind.replyMessage = welcomeMsg.replyMessage
        welcomeMsgFind.status = welcomeMsg.status

        const welcomeMsgSaved = await welcomeMsgFind.save()

        const data = {
          status: 'success',
          message: '存取成功',
          data: {
            welcomeMsg: welcomeMsgSaved
          }
        }
        callback(data)
      } else {
        // data not found
        const data = {
          status: 'error',
          message: '存取失敗，請確認資料正確性',
        }
        callback(data)
      }
    } catch (err) {
      const data = {
        status: 'error',
        message: '存取失敗',
        error: err.message
      }
      callback(data)
    }
  },
}

module.exports = welcomeMsgService