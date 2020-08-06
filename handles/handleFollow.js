'use strict'

// import model
const db = require('../models')
const LineUser = db.LineUser
const WelcomeMsg = db.WelcomeMsg
const LineUserChatbot = db.LineUserChatbot
const Chatbot = db.Chatbot

// import welcomeMsgSchema
const welcomeMsgSchema = require('../templates/welcomeMsg/welcomeMsgSchema.json')


const handleFollow = async function ({
  event,
  client,
  reqParams
}) {
  try {
    // 尋找 chatbot 資料
    const chatbot = await Chatbot.findOne({
      where: {
        botId: reqParams.botId
      }
    })

    // 從 LINE 官方取得用戶資料
    const userProfileFromLINE = await client.getProfile(event.source.userId)

    let welcomeMsgFind,
      welcomeMsgSend //回應給使用者的歡迎訊息

    if (!chatbot) {
      throw new Error('找不到對應的 chatbot 資料')
    } else {
      // 找尋 chatbot 對應的歡迎訊息
      welcomeMsgFind = await WelcomeMsg.findOne({
        where: {
          ChatbotId: chatbot.id,
          status: 'in-use'
        }
      })

      if (welcomeMsgFind) {
        welcomeMsgSend = welcomeMsgFind.replyMessage
      } else {
        // 若 chatbot 無建置或啟用自訂的歡迎訊息，則回傳官方預設訊息
        welcomeMsgSend = JSON.parse(JSON.stringify(welcomeMsgSchema))

        // 置換官方預設歡迎訊息 schema 的{Nickname}名稱及 {channel.channelName}
        let newText = welcomeMsgSend.text.replace('{Nickname}', userProfileFromLINE.displayName).replace('{channel.channelName}', '鱷魚醫生')

        welcomeMsgSend.text = newText
      }
    }

    // 從資料庫找 user 資料
    const user = await LineUser.findOne({
      where: {
        userId: event.source.userId
      }
    })

    // 若無建置使用者資料
    if (!user) {
      const userCreate = await LineUser.create({
        userId: event.source.userId,
        displayName: userProfileFromLINE.displayName,
        pictureUrl: userProfileFromLINE.pictureUrl,
        statusMessage: userProfileFromLINE.statusMessage,
        language: userProfileFromLINE.language,
      })

      // 建立機器人與使用者的關係
      if (userCreate && chatbot) {
        const relationShip = await LineUserChatbot.create({
          status: 'join',
          interactiveStatus: 'active',
          joinDate: new Date(),
          LineUserId: userCreate.id,
          ChatbotId: chatbot.id
        })

        // 回傳訊息
        return client.replyMessage(event.replyToken, welcomeMsgSend);
      } else {
        throw new Error('建置使用者資料失敗 or 找不到對應的 chatbot 資訊')
      }
    }

    // 若已建置使用者資料
    if (user) {
      // 更新使用者資料
      user.displayName = userProfileFromLINE.displayName
      user.pictureUrl = userProfileFromLINE.pictureUrl
      user.statusMessage = userProfileFromLINE.statusMessage
      user.language = userProfileFromLINE.language

      const userSaved = await user.save()

      if (userSaved && chatbot) {
        const relationShip = await LineUserChatbot.findOne({
          where: {
            LineUserId: userSaved.id,
            ChatbotId: chatbot.id
          }
        })

        if (relationShip) {
          // 更新使用者與機器人的關係
          relationShip.status = 'join'
          relationShip.interactiveStatus = 'active'
          const relationShipSaved = await relationShip.save()

          // 回傳訊息
          return client.replyMessage(event.replyToken, welcomeMsgSend);
        } else {
          throw new Error('找不到對應的 LineUserChatbot 資料')
        }
      } else {
        throw new Error('建置使用者資料失敗 or 找不到對應的 chatbot 資訊')
      }
    }

  } catch (err) {
    // 記錄錯誤訊息 =>尚未建置
    console.log(err)

    // 回傳訊息
    return client.replyMessage(event.replyToken, welcomeMsgSchema.replyMessage);
  }
}

module.exports = handleFollow