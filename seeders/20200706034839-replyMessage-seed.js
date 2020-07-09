'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ReplyMessages', [{
      type: 'text', // reply message type
      name: '點餐機', // 模組名稱
      uuid: uuidv4(), // 使用於主控台
      messageTemplate:
        JSON.stringify([
          {
            type: "text",
            text: "收到你的菜單了"
          },
          {
            type: "text",
            text: "儘快為你送上餐點"
          }
        ]),  // message json
      status: 'edited', //此模組的狀態
      ChatbotId: 1, //FK
      ModuleKeywordId: 1, //FK
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      type: 'text', // reply message type
      name: '和動物做朋友', // 模組名稱
      uuid: uuidv4(), // 使用於主控台
      messageTemplate:
        JSON.stringify([
          {
            type: "text",
            text: "你好~"
          },
          {
            type: "text",
            text: "很開心跟你做朋友"
          }
        ]),  // message json
      status: 'edited', //此模組的狀態
      ChatbotId: 1, //FK
      ModuleKeywordId: 2, //FK
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ReplyMessages', null, {});
  }
};
