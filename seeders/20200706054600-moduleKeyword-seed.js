'use strict';
const { v4: uuidv4 } = require('uuid');
const ChatbotId = 1

const ReplyMessageIds = [1, 5, 6, 7, 8, 9]
const ModuleKeywordIds = [1, 2, 3, 4, 5, 6]
const autoIncrementNum = 10; //local DB 設定1，若為 heroku mySQL DB 則須改為10

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ModuleKeywords', [
      {
        name: '產前檢查', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '孕期衛教', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '胎兒成長', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '生理記錄', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '問與答', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '更多資訊', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ModuleKeywords', null, {});
  }
};
