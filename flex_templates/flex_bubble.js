'use strict'
// base URL for webhook server
let baseURL = process.env.BASE_URL;
let imgURL = `${baseURL}/public/images`

let fullStarIcon = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
let grayStarIcon = 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'


const flexBubble = {
  "type": "flex",
  "altText": "colored flex bubble",
  "contents": {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": `${imgURL}/flex/starbucks.png`,
      "size": "full",
      "aspectRatio": "178:100",
      "aspectMode": "cover",
      "action": {
        "type": "uri",
        "uri": "https://goo.gl/maps/LvbBML4qWKgeWC247"
      }
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "STARBUCKS 星巴克 (清境門市)",
          "weight": "bold",
          "size": "xl"
        },
        {
          "type": "box",
          "layout": "baseline",
          "margin": "md",
          "contents": [
            {
              "type": "icon",
              "size": "sm",
              "url": `${fullStarIcon}`
            },
            {
              "type": "icon",
              "size": "sm",
              "url": `${fullStarIcon}`
            },
            {
              "type": "icon",
              "size": "sm",
              "url": `${fullStarIcon}`
            },
            {
              "type": "icon",
              "size": "sm",
              "url": `${fullStarIcon}`
            },
            {
              "type": "icon",
              "size": "sm",
              "url": `${grayStarIcon}`
            },
            {
              "type": "text",
              "text": "4.0",
              "size": "sm",
              "color": "#999999",
              "margin": "md",
              "flex": 0
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Place",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 1
                },
                {
                  "type": "text",
                  "text": "546南投縣仁愛鄉號1樓",
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Time",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 1
                },
                {
                  "type": "text",
                  "text": "10:00 - 23:00",
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "style": "link",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": "CALL",
            "uri": "https://linecorp.com"
          }
        },
        {
          "type": "button",
          "style": "link",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": "WEBSITE",
            "uri": "https://linecorp.com"
          }
        },
        {
          "type": "spacer",
          "size": "sm"
        }
      ],
      "flex": 0
    }
  }
}

module.exports = { flexBubble }