'use strict'

const cities = [
  {
    name: '南庄老街',
    description: '「南庄老街」老街建築起於1935年關刀山大地震後，當時南庄受創嚴重，重建時委以日本人規劃設計，兩層樓的懷舊日式木造建築，成為老街的一大特色。熱門景點多集中在永昌宮附近的中正路及一旁小巷，桂花巷、南庄老郵局、水汴頭洗衫坑、永昌宮、老楓樹、上崁子...等必遊景點，以及美食桂花釀、豬籠粄、狗薑粽、桂花冰鎮湯圓、桂花梅、擂茶、滷豆干、客家菜等必嚐在地小吃，都是旅客不能錯過的重點。',
    uri: 'https://okgo.tw/butyview.html?id=2888'
  },
  {
    name: '藍色公路',
    description: '台灣四面臨海，不同海濱城市都有不同的碧海風光，台灣北部的基隆就是一個以海洋觀光著名的都市。藍色公路是基隆市積極推動的海城觀光，以現今豐富的海洋觀光資源打造出一條海上藍色公路，串聯起遠洋、近海、海灣和沿岸漁港的觀光路線，沿途有許多具有可看性的景觀。雖然基隆境內的海岸線只有29.6公里，但基隆港深入市區，是台灣最有觀光潛力的港口，除了本身得天獨厚的海洋優勢，政府也積極發展與修繕岸上的設施，讓藍色公路成為北台灣的觀光重點。',
    uri: 'https://okgo.tw/butyview.html?id=2636'
  },
  {
    name: '基隆廟口',
    description: '「基隆廟口」小吃位於愛三路到愛四路間的仁三路兩側，近年來因經過重新規劃整修，小吃街變得井然有序，基隆廟口小吃街的美食各有不同風味與歷史，知名的天婦羅、鼎邊銼、奶油螃蟹、生猛海鮮、三明治、雞捲、豆簽羹、原汁豬腳、紅燒鰻魚羹、泡泡冰等美食攤販讓人目不暇給，更有許多具有台灣風味的零嘴小吃，如燒酒螺、糖葫蘆、烤魷魚腳、涼粿、醃芭樂…食指大動，而愛四路的傳統夜市人潮鼎沸，除了許多美味小吃外，更有許多商品叫賣，置身其間，可享受傳統道地美食以及充分體驗當地人文風貌。',
    uri: 'https://okgo.tw/butyview.html?id=478'
  },
]

let carouselContents = []
cities.forEach(city => {
  carouselContents.push({
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "horizontal",
      "backgroundColor": "#EBE5E9",
      "contents": [
        {
          "type": "text",
          "text": `${city.name}`,
          "wrap": true,
          "flex": 1
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": `${city.description}`,
          "wrap": true,
          "flex": 1
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "style": "primary",
          "action": {
            "type": "uri",
            "label": "Go",
            "uri": `${city.uri}`
          }
        }
      ]
    }
  })
})

const flexCarousel = {
  "type": "flex",
  "altText": "this is a flex message",
  "contents":
  {
    "type": "carousel",
    "contents": carouselContents
  }
}

module.exports = { flexCarousel }