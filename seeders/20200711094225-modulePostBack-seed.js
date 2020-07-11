'use strict';
const { v4: uuidv4 } = require('uuid');
const ChatbotId = 1

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ModulePostBacks', [
      {
        name: '服務選單-產前檢查', //id:1
        uuid: uuidv4(),
        moduleUsedCount: 0,
        moduleReadCount: 0,
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '產前檢查-查詢健保給付項目', //id:2
        uuid: uuidv4(),
        moduleUsedCount: 0,
        moduleReadCount: 0,
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '產前檢查-查詢自費項目', //id:3
        uuid: uuidv4(),
        moduleUsedCount: 0,
        moduleReadCount: 0,
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '產前檢查-依週期數查詢產檢項目', //id:4
        uuid: uuidv4(),
        moduleUsedCount: 0,
        moduleReadCount: 0,
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: '服務選單-孕期衛教', //id:5
        uuid: uuidv4(),
        moduleUsedCount: 0,
        moduleReadCount: 0,
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '服務選單-胎兒成長', //id:6
        uuid: uuidv4(),
        moduleUsedCount: 0,
        moduleReadCount: 0,
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '服務選單-生理記錄', //id:7
        uuid: uuidv4(),
        moduleUsedCount: 0,
        moduleReadCount: 0,
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '服務選單-問與答', //id:8
        uuid: uuidv4(),
        moduleUsedCount: 0,
        moduleReadCount: 0,
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '服務選單-更多資訊', //id:9
        uuid: uuidv4(),
        moduleUsedCount: 0,
        moduleReadCount: 0,
        status: 'in-use',
        ChatbotId: ChatbotId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ModulePostBacks', null, {});
  }
};
