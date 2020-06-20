'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  // 如果不是 production 模式
  // 使用 dotenv 讀取 .env 檔案
  require('dotenv').config()
}

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// base URL for webhook server
let baseURL = process.env.BASE_URL;

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// serve static files
app.use('/public', express.static('public'));

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.use('/callback', line.middleware(config), (req, res, next) => {
  // 測試用途，了解 event 內容
  console.log('req.header:', req.headers)
  console.log('req.body:', req.body)
  console.log('event.source:', req.body.events[0].source)
  console.log('event.message:', req.body.events[0].message)

  next()
})

app.post('/callback', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

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
          // return client.replyMessage(event.replyToken, {
          //   type: 'text', text: 'you send a text.'
          // })
          return handleText(message, event.replyToken, event.source)
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
      let data = event.postback.data;
      if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
        data += `(${JSON.stringify(event.postback.params)})`;
      }
      return replyText(event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);

  }
}

function handleText(message, replyToken, source) {
  let replyMsg
  const imageURL = `${baseURL}/public/images`
  const videoURL = `${baseURL}/public/videos`
  const audioURL = `${baseURL}/public/audios`
  switch (message.text) {
    // send text
    case 'hello':
      return replyText(replyToken, 'wolrd')
    case 'good':
      return replyText(replyToken, 'job')
    case 'texts limit':
      replyMsg = [{
        'type': 'text',
        'text': 'reply message 1'
      },
      {
        'type': 'text',
        'text': 'reply message 2'
      },
      {
        'type': 'text',
        'text': 'reply message 3'
      },
      {
        'type': 'text',
        'text': 'reply message 4'
      },
      {
        'type': 'text',
        'text': 'reply message 5'
      }
      ]
      return client.replyMessage(replyToken, replyMsg)
    case 'emoji':
      replyMsg = {
        "type": "text",
        "text": "$$$$$ 就是愛 emoji ", // $代表 emoji
        "emojis": [
          {
            "index": 0,
            "productId": "5ac1bfd5040ab15980c9b435",
            "emojiId": "001"
          },
          {
            "index": 1,
            "productId": "5ac1bfd5040ab15980c9b435",
            "emojiId": "002"
          },
          {
            "index": 2,
            "productId": "5ac1bfd5040ab15980c9b435",
            "emojiId": "047"
          },
          {
            "index": 3,
            "productId": "5ac1bfd5040ab15980c9b435",
            "emojiId": "018"
          },
          {
            "index": 4,
            "productId": "5ac1bfd5040ab15980c9b435",
            "emojiId": "094"
          }
        ]
      }
      return client.replyMessage(replyToken, replyMsg)

    // send image
    case 'image':
      console.log('imageURL:', imageURL)
      replyMsg = {
        "type": "image",
        "originalContentUrl": `${imageURL}/buttons/dinosaur_space.png`,
        "previewImageUrl": `${imageURL}/buttons/dinosaur_painter.png`,
        "animated": true
      }
      return client.replyMessage(replyToken, replyMsg)

    // // send video
    case 'video':
      console.log('videoURL:', videoURL);
      return client.replyMessage(replyToken, {
        "type": "video",
        "originalContentUrl": `${videoURL}/country_road/video.mp4`,
        "previewImageUrl": `${videoURL}/country_road/preview.jpeg`,
      })

    // send audio
    case 'audio':
      return client.replyMessage(replyToken, {
        "type": "audio",
        "originalContentUrl": `${audioURL}/country_road.m4a`,
        "duration": 214000
      })

    // send location
    case 'location':
      return client.replyMessage(replyToken, {
        "type": "location",
        "title": "古羅馬廣場",
        "address": "Via della Salara Vecchia, 5/6, 00186 Roma RM, 義大利",
        "latitude": 41.892575,
        "longitude": 12.485349,
      })

    // send sticker
    case 'sticker':
      return client.replyMessage(replyToken, {
        "type": "sticker",
        "packageId": "11537",
        "stickerId": "52002753"
      })

    // send imagemap
    case 'imagemap':
      return client.replyMessage(
        replyToken,
        {
          type: 'imagemap',
          baseUrl: `${baseURL}/public/imagemap/social_media`,
          altText: 'Social media',
          baseSize: { width: 1040, height: 650 },
          actions: [
            { area: { x: 0, y: 0, width: 520, height: 325 }, type: 'uri', linkUri: 'https://www.facebook.com/' },
            { area: { x: 520, y: 0, width: 520, height: 325 }, type: 'uri', linkUri: 'https://www.google.com.tw/' },
            { area: { x: 0, y: 325, width: 520, height: 325 }, type: 'message', text: 'Facebook!' },
            { area: { x: 520, y: 325, width: 520, height: 325 }, type: 'message', text: 'Google!' },
          ],
          video: {
            originalContentUrl: `${videoURL}/country_road/video.mp4`,
            previewImageUrl: `${videoURL}/country_road/preview.jpeg`,
            area: {
              x: 320,
              y: 220,
              width: 400,
              height: 240,
            },
            externalLink: {
              linkUri: 'https://youtu.be/HmeX9_sjGQI',
              label: 'Go to youtube'
            }
          },
        }
      );

    case 'profile':
      return client.getProfile(source.userId)
        .then((profile) => {
          console.log('profile:', profile)
          return replyText(replyToken, [
            `Your name: ${profile.displayName}`,
            `Status message: ${profile.statusMessage}`
          ])
        })
    case 'getGroup':
      return client.getGroupMemberProfile(source.groupId, source.userId)
    default:
      return replyText(replyToken, 'nothing to say')
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port} `);
});



