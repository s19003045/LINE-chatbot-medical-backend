'use strict'

const { handlePostback } = require('./handlePostback')
const { handleText } = require('./handleText')
const { initReplyText } = require('../libs/utils')
const handleFollow = require('./handleFollow')

const db = require('../models')
const User = db.User

function initHandleEvent(client) {
  const replyText = initReplyText(client)

  // event handler
  function handleEvent(event) {
    // 官網測試 webhookURL
    if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
      return console.log("Test hook recieved: " + JSON.stringify(event.message));
    }

    switch (event.type) {
      // 訊息事件
      case 'message':
        const message = event.message
        switch (message.type) {
          case 'text':
            return handleText(
              {
                message: message,
                replyToken: event.replyToken,
                source: event.source,
                client: client,
                reqParams: event.reqParams
              }
            )
          case 'image':
            return client.replyMessage(event.replyToken, {
              type: 'text', text: 'you send a image.'
            })
          case 'video':
            return client.replyMessage(event.replyToken, {
              type: 'text', text: 'you send a video.'
            })
          case 'audio':
            return client.replyMessage(event.replyToken, {
              type: 'text', text: 'you send an audio.'
            })
          case 'file':
            return client.replyMessage(event.replyToken, {
              type: 'text', text: 'you send an file.'
            })
          case 'location':
            return client.replyMessage(event.replyToken, {
              type: 'text', text: 'you send a location.'
            })
          case 'sticker':
            return client.replyMessage(event.replyToken, {
              type: 'text', text: 'you send a sticker.'
            })
          default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`);
        }

      //LINE 使用者加為好友
      case 'follow':
        return handleFollow({
          replyToken: event.replyToken,
          source: event.source,
          event,
          client,
          reqParams: event.reqParams
        })

      //LINE 使用者取消好友關係
      case 'unfollow':
        return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

      //機器人受邀加入 group 或 room
      case 'join':
        return replyText(event.replyToken, `Joined ${event.source.type}`);

      //機器人離開 group 或 room
      case 'leave':
        return console.log(`Left: ${JSON.stringify(event)}`);
      //機器人所在的 group 或 room ，有人加入時

      case 'memberJoined':
        return replyText(event.replyToken, `memberJoined ${event.source.type}`);

      //機器人所在的 group 或 room ，有人離開時
      case 'memberLeft':
        return console.log(`memberLeft: ${JSON.stringify(event)}`);

      // 回傳動作事件
      case 'postback':
        return handlePostback({
          event,
          client,
          reqParams: event.reqParams
        })

      case 'beacon':
        return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`);

    }
  }

  return handleEvent
}

module.exports = { initHandleEvent }