'use strict'

const querystring = require('querystring');
// base URL for webhook server
let baseURL = process.env.BASE_URL;
// 模擬資料庫：用於 carousel template，統計投票結果
let fake_candidates =
  [
    { id: 1, name: 'doris', vote: 0 },
    { id: 2, name: 'ken', vote: 0 },
    { id: 3, name: 'eric', vote: 0 },
    { id: 4, name: 'richfather', vote: 0 },
  ]

// 處理 postback 訊息
function handlePostback(event, client, replyText) {
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

    case 'flyToMoon':
      if (_data.flyToMoon === 'true') {
        // 詢問登陸月球日期
        return client.replyMessage(
          event.replyToken,
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
                  "data": "action=departure_to_moon&type=DATETIME",
                  "mode": "datetime",
                  "initial": "2020-06-01t00:00",
                  "max": "2020-12-01t23:59",
                  "min": "2020-06-01t00:00"
                },
                {
                  "type": "datetimepicker",
                  "label": "回程日期",
                  "data":
                    "action=return_from_moon&type=DATETIME",
                  "mode": "datetime",
                  "initial": "2020-06-01t00:00",
                  "max": "2020-12-01t23:59",
                  "min": "2020-06-01t00:00"
                }
              ]
            }
          })
      } else {
        return client.replyMessage(
          event.replyToken,
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
                  displayText: '我要 VR 探險月球',
                  data: 'action=vr_moon&VRmoon=true'
                },
                {
                  type: 'postback',
                  label: '我不要VR探險',
                  displayText: '我不要VR探險',
                  data: 'action=vr_moon&VRmoon=false'
                }
              ]
            }
          }
        )
      }

    case 'departure_to_moon':
      return replyText(event.replyToken, `出發去月球時間 : ${JSON.stringify(event.postback.params)}`)

    case 'return_from_moon':
      return replyText(event.replyToken, `從月球回程出發時間 : ${JSON.stringify(event.postback.params)}`)

    case 'vr_moon':
      if (_data.VRmoon === 'true') {
        return replyText(event.replyToken, '歡迎你隨時前來本館體驗 VR 探險月球！')
      } else {
        return replyText(event.replyToken, '感謝你的回覆！')
      }

    case 'eatIcecream':
      if (_data.eatIcecream === 'true') {
        return replyText(event.replyToken, '請吃！')
      } else {
        return replyText(event.replyToken, '謝謝！')
      }

    case 'nextStation':
      if (_data.area === 'japan') {
        const fakedHotSpots = ['東京', '大阪', '北海島', '沖繩', '九州', '京都奈良', '富士山']
        const quickReplyItems = []
        fakedHotSpots.forEach((spot) => {
          quickReplyItems.push({
            "type": "action",
            "action": {
              "type": "postback",
              "label": `${spot}`,
              "displayText": `${spot}`,
              "data": `action=nextStation&area=${spot}`
            }
          })
        })

        return client.replyMessage(event.replyToken, {
          "type": "text",
          "text": "要前往哪一個景點？",
          "quickReply": {
            "items": quickReplyItems
          }
        })
      } else {
        return replyText(event.replyToken, `準備前往 => ${_data.area}`)
      }


    default:
      return replyText(event.replyToken, `Got postback: ${data}`);
  }
}

module.exports = { handlePostback }