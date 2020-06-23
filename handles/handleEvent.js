'use strict'

const { handlePostback } = require('./handlePostback')
const { handleText } = require('./handleText')
const { initReplyText } = require('../libs/utils')


function initHandleEvent(client) {
  const replyText = initReplyText(client)

  // event handler
  function handleEvent(event) {
    // 官網測試 webhookURL
    if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
      return console.log("Test hook recieved: " + JSON.stringify(event.message));
    }

    switch (event.type) {
      case 'message':
        const message = event.message
        switch (message.type) {
          case 'text':
            return handleText(message, event.replyToken, event.source, client, replyText)
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

      case 'follow':
        return replyText(event.replyToken, 'Got followed event');

      case 'unfollow':
        return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

      case 'join':
        return replyText(event.replyToken, `Joined ${event.source.type}`);

      case 'leave':
        return console.log(`Left: ${JSON.stringify(event)}`);

      case 'memberJoined':
        return replyText(event.replyToken, `memberJoined ${event.source.type}`);

      case 'memberLeft':
        return console.log(`memberLeft: ${JSON.stringify(event)}`);

      case 'postback':
        return handlePostback(event, client, replyText)

      case 'beacon':
        return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`);

    }
  }

  return handleEvent
}

module.exports = { initHandleEvent }