'use strict';
const { v4: uuidv4 } = require('uuid');
const ChatbotId = 1

const ModuleKeywordIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const autoIncrementNum = 10; //local DB 設定1，若為 heroku mySQL DB 則須改為10

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ModuleKeywords', [
      {
        name: '產前檢查', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        moduleUsedCount: 0,
        moduleReadCount: 0,
        ChatbotId: ChatbotId,
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '孕期衛教', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        moduleUsedCount: 0,
        moduleReadCount: 0,
        ChatbotId: ChatbotId,
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '胎兒成長', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        moduleUsedCount: 0,
        moduleReadCount: 0,
        ChatbotId: ChatbotId,
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '生理記錄', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        moduleUsedCount: 0,
        moduleReadCount: 0,
        ChatbotId: ChatbotId,
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '問與答', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        moduleUsedCount: 0,
        moduleReadCount: 0,
        ChatbotId: ChatbotId,
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '更多資訊', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        moduleUsedCount: 0,
        moduleReadCount: 0,
        ChatbotId: ChatbotId,
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '查詢健保給付項目', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        moduleUsedCount: 0,
        moduleReadCount: 0,
        ChatbotId: ChatbotId,
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '查詢自費項目', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        moduleUsedCount: 0,
        moduleReadCount: 0,
        ChatbotId: ChatbotId,
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '依週期數查詢產檢項目', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        moduleUsedCount: 0,
        moduleReadCount: 0,
        ChatbotId: ChatbotId,
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ModuleKeywords', null, {});
  }
};
