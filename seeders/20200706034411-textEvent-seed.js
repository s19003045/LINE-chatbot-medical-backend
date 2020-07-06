'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TextEvents', [
      {
        uuid: 'd59e9540-dabe-471c-9a9c-d4a08f87fe99', //使用於主控台
        text: '冰淇淋', //關鍵字
        ReplyMessageId: 1, //FK
        ChatbotId: 1, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: 'd59e9540-dabe-471c-9a9c-d4a08f87fe99', //使用於主控台
        text: '香蕉', //關鍵字
        ReplyMessageId: 1, //FK
        ChatbotId: 1, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: 'd59e9540-dabe-471c-9a9c-d4a08f87fe99', //使用於主控台
        text: '芒果', //關鍵字
        ReplyMessageId: 1, //FK
        ChatbotId: 1, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TextEvents', null, {});
  }
};
