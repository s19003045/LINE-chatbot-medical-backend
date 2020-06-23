'use strict'
// base URL for webhook server
let baseURL = process.env.BASE_URL;

function handleText(message, replyToken, source, client, replyText) {
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
              { label: '我要登陸月球', type: 'postback', displayText: '我要登陸月球', data: 'action=flyToMoon&flyToMoon=true' },
              { label: '我不要登陸月球', type: 'postback', displayText: '我不要登陸月球', data: 'action=flyToMoon&flyToMoon=false' }
            ],
          },
        }
      );

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
              { type: 'postback', label: 'Yes', data: 'action=eatIcecream&eatIcecream=true', displayText: 'Yes!' },
              { type: 'postback', label: 'No', data: 'action=eatIcecream&eatIcecream=false', displayText: 'No!' },
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

    case 'image carousel':
      return client.replyMessage(replyToken,
        {
          "type": "template",
          "altText": "this is a image carousel template",
          "template": {
            "type": "image_carousel",
            "columns": [
              {
                "imageUrl": `${imageURL}/buttons/dinosaur_heart.png`,
                "action": {
                  "type": "postback",
                  "label": "Buy",
                  "data": "action=buy&itemid=111"
                }
              },
              {
                "imageUrl": `${imageURL}/buttons/dinosaur_music.png`,
                "action": {
                  "type": "message",
                  "label": "Yes",
                  "text": "yes"
                }
              },
              {
                "imageUrl": `${imageURL}/buttons/dinosaur_painter.png`,
                "action": {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "https://store.line.me/family/play/en"
                }
              }
            ]
          }
        })

    // quick replies
    case 'quick replies':
      return client.replyMessage(replyToken, {
        "type": "text",
        "text": "拍照、上傳照片、打卡、前往下一個景點？",
        "quickReply": {
          "items": [
            {
              "type": "action",
              "action": {
                "type": "camera",
                "label": "拍照"
              }
            },
            {
              "type": "action",
              "action": {
                "type": "cameraRoll",
                "label": "上傳照片"
              }
            },
            {
              "type": "action",
              "action": {
                "type": "location",
                "label": "打卡"
              }
            },
            {
              "type": "action",
              "imageUrl": `${imageURL}/quick_replies/japan.png`,
              "action": {
                "type": "postback",
                "label": "下一個景點",
                "displayText": "下一個景點",
                "data": "action=nextStation&area=japan"
              }
            }
          ]
        }
      })
    // 與 profile 有關的方法
    case 'profile':
      if (source.userId) {
        return client.getProfile(source.userId)
          .then((profile) => replyText(
            replyToken,
            [
              `Display name: ${profile.displayName}`,
              `Status message: ${profile.statusMessage}`,
            ]
          ));
      } else {
        return replyText(replyToken, 'Bot can\'t use profile API without user ID');
      }

    case 'getGroup':
      return client.getGroupMemberProfile(source.groupId, source.userId)

    default:
      return replyText(replyToken, `${message.text}`)
  }
}

module.exports = { handleText }