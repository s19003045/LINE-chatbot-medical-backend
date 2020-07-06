'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ReplyMessages', [{
      type: 'text', // reply message type
      name: '食物好吃', // 模組名稱
      uuid: uuidv4(), // 使用於主控台
      messageTemplate: JSON.stringify({
        type: "text",
        text: "食物好吃"
      }),  // message json
      status: 'edited', //此模組的狀態
      ChatbotId: 1, //FK
      ModuleKeywordId: 1, //FK
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ReplyMessages', null, {});
  }
};
