'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ReplyMessages', [{
      type: 'text', // reply message type
      name: '食物好吃', // 模組名稱
      uuid: '3a2addec-ad4f-4501-bfd9-9d75cc4399d6', // 使用於主控台
      messageTemplate: JSON.stringify({
        type: "text",
        text: "食物好吃"
      }),  // message json
      status: 'edited', //此模組的狀態
      ChatbotId: 1, //FK
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ReplyMessages', null, {});
  }
};
