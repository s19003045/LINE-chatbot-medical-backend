'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TextEvents', [
      {
        uuid: uuidv4(), //使用於主控台
        text: '冰淇淋', //關鍵字
        ReplyMessageId: 1, //FK
        ChatbotId: 1, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
        text: '香蕉', //關鍵字
        ReplyMessageId: 1, //FK
        ChatbotId: 1, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
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
