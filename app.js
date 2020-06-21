'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const querystring = require('querystring');


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
  console.log('event.postback:', req.body.events[0].postback)

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

// 模擬資料庫：用於 carousel template，統計投票結果
let fake_candidates =
  [
    { id: 1, name: 'doris', vote: 0 },
    { id: 2, name: 'ken', vote: 0 },
    { id: 3, name: 'eric', vote: 0 },
    { id: 4, name: 'richfather', vote: 0 },
  ]

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
      return handlePostback(event)

    case 'beacon':
      return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);

  }
}

// 處理 postback 訊息
function handlePostback(event) {
  const imageURL = `${baseURL}/public/images`
  let data = event.postback.data
  let _data = querystring.parse(data)
  switch (_data.action) {
    case 'vote':
      fake_candidates.forEach((d) => {
        if (d.name === _data.candidate) {
          d.vote += 1
        }
      })
      let statistic_ouput = '投票結果：'
      fake_candidates.forEach((d) => {
        statistic_ouput += `\n${d.name} : ${d.vote} 票`
      })
      return replyText(event.replyToken, statistic_ouput);

    default:
      return replyText(event.replyToken, `Got postback: ${data}`);
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

    // buttons template
    case 'buttons':
      return client.replyMessage(
        replyToken,
        {
          type: 'template',
          altText: '太空探險',
          template: {
            type: 'buttons',
            thumbnailImageUrl: `${imageURL}/buttons/dinosaur_space.png`,
            title: '太空探險',
            text: '跟我一起去外太空吧！',
            actions: [
              { label: '太陽系介紹', type: 'uri', uri: 'https://youtu.be/libKVRa01L8' },
              { label: '銀河系之美', type: 'uri', uri: 'https://youtu.be/4VX6Nh6YLYk' },
              { label: '我要登陸月球', type: 'postback', text: '我要登陸月球', data: 'action=fly&gotomoon=true' },
              { label: '我不要登陸月球', type: 'postback', text: '我不要登陸月球', data: 'action=null&gotomoon=false' }

            ],
          },
        }
      );

    // 詢問登陸月球日期
    case '我要登陸月球':
      return client.replyMessage(
        replyToken,
        {
          type: 'template',
          altText: '登陸月球',
          template: {
            type: 'buttons',
            thumbnailImageUrl: `${imageURL}/buttons/dinosaur_space.png`,
            title: '坐太空梭登陸月球',
            text: '選個登陸月球日期',
            actions: [
              {
                "type": "datetimepicker",
                "label": "出發日期",
                "data": "DATETIME",
                "mode": "datetime",
                "initial": "2020-06-01t00:00",
                "max": "2020-12-01t23:59",
                "min": "2020-06-01t00:00"
              },
              {
                "type": "datetimepicker",
                "label": "回程日期",
                "data": "DATETIME",
                "mode": "datetime",
                "initial": "2020-06-01t00:00",
                "max": "2020-12-01t23:59",
                "min": "2020-06-01t00:00"
              }
            ]
          }
        })

    case '我不要登陸月球':
      return client.replyMessage(
        replyToken,
        {
          type: 'template',
          altText: 'VR 探險月球',
          template: {
            type: 'buttons',
            thumbnailImageUrl: `${imageURL}/buttons/dinosaur_music.png`,
            title: 'VR 探險月球',
            text: '要來個 VR 探險月球嗎？',
            actions: [
              {
                type: 'postback',
                label: '我要 VR 探險月球',
                text: '我要 VR 探險月球',
                data: 'vr_moon=true'
              },
              {
                type: 'postback',
                label: '我不要VR探險',
                text: '我不要VR探險',
                data: 'vr_moon=false'
              }
            ]
          }
        }
      )

    // confirm template
    case 'confirm':
      return client.replyMessage(
        replyToken,
        {
          type: 'template',
          altText: '炎炎夏日，來個土耳其冰淇淋消消暑',
          template: {
            type: 'confirm',
            text: '炎炎夏日，來個土耳其冰淇淋消消暑?',
            actions: [
              { type: 'postback', label: 'Yes', data: 'icecream=true', text: 'Yes!' },
              { type: 'postback', label: 'No', data: 'icecream=false', text: 'No!' },
            ],
          },
        }
      )

    // carousel template
    case 'carousel':
      return client.replyMessage(
        replyToken,
        {
          type: 'template',
          altText: '最佳主持人票選',
          template: {
            type: 'carousel',
            imageAspectRatio: 'square',
            columns: [
              {
                thumbnailImageUrl: `${imageURL}/buttons/dinosaur_heart.png`,
                title: '朵瑞斯',
                text: '來自熱情洋溢的海島',
                actions: [
                  { label: '投我一票', type: 'postback', displayText: '投朵瑞斯一票', data: 'action=vote&candidate=doris&vote=1' },
                  { label: '查看更多', type: 'uri', uri: 'https://line.me' },
                ],
              },
              {
                thumbnailImageUrl: `${imageURL}/buttons/dinosaur_music.png`,
                title: '凱恩',
                text: '就是愛音樂！',
                actions: [
                  { label: '投我一票', type: 'postback', displayText: '投凱恩一票', data: 'action=vote&candidate=ken&vote=1' },
                  { label: '查看更多', type: 'uri', uri: 'https://line.me' },
                ],
              },
              {
                thumbnailImageUrl: `${imageURL}/buttons/dinosaur_painter.png`,
                title: '艾瑞克',
                text: '彩繪人生~',
                actions: [
                  { label: '投我一票', type: 'postback', displayText: '投艾瑞克一票', data: 'action=vote&candidate=eric&vote=1' },
                  { label: '查看更多', type: 'uri', uri: 'https://line.me' },
                ],
              },
              {
                thumbnailImageUrl: `${imageURL}/buttons/dinosaur_saint.png`,
                title: '富爸',
                text: '來發禮物囉!',
                actions: [
                  { label: '投我一票', type: 'postback', displayText: '投富爸一票', data: 'action=vote&candidate=richfather&vote=1' },
                  { label: '查看更多', type: 'uri', uri: 'https://line.me' },
                ],
              },
            ],
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



