'use strict';
const { v4: uuidv4 } = require('uuid');
const ChatbotId = 1

const ReplyMessageIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const ModulePostbackIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const autoIncrementNum = 1; //local DB 設定1，若為 heroku mySQL DB 則須改為10

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PostBackEvents', [
      {
        name: '服務選單',
        uuid: uuidv4(),
        eventType: 'postBack',
        postEventCount: 0,
        subject: '服務選單',
        data: '產前檢查',
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[0] - 1),  //FK
        ChatbotId: ChatbotId,
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostbackIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '產前檢查',
        uuid: uuidv4(),
        eventType: 'postBack',
        postEventCount: 0,
        subject: '產前檢查',
        data: '查詢健保給付項目',
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[1] - 1),  //FK
        ChatbotId: ChatbotId,
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostbackIds[1] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '產前檢查',
        uuid: uuidv4(),
        eventType: 'postBack',
        postEventCount: 0,
        subject: '產前檢查',
        data: '查詢自費項目',
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[2] - 1),  //FK
        ChatbotId: ChatbotId,
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostbackIds[2] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '產前檢查',
        uuid: uuidv4(),
        eventType: 'postBack',
        postEventCount: 0,
        subject: '產前檢查',
        data: '依週期數查詢產檢項目',
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[3] - 1),  //FK
        ChatbotId: ChatbotId,
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostbackIds[3] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '服務選單',
        uuid: uuidv4(),
        eventType: 'postBack',
        postEventCount: 0,
        subject: '服務選單',
        data: '孕期衛教',
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[4] - 1),  //FK
        ChatbotId: ChatbotId,
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostbackIds[4] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '服務選單',
        uuid: uuidv4(),
        eventType: 'postBack',
        postEventCount: 0,
        subject: '服務選單',
        data: '胎兒成長',
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[5] - 1),  //FK
        ChatbotId: ChatbotId,
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostbackIds[5] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '服務選單',
        uuid: uuidv4(),
        eventType: 'postBack',
        postEventCount: 0,
        subject: '服務選單',
        data: '生理記錄',
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[6] - 1),  //FK
        ChatbotId: ChatbotId,
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostbackIds[6] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '服務選單',
        uuid: uuidv4(),
        eventType: 'postBack',
        postEventCount: 0,
        subject: '服務選單',
        data: '問與答',
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[7] - 1),  //FK
        ChatbotId: ChatbotId,
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostbackIds[7] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '服務選單',
        uuid: uuidv4(),
        eventType: 'postBack',
        postEventCount: 0,
        subject: '服務選單',
        data: '更多資訊',
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[8] - 1),  //FK
        ChatbotId: ChatbotId,
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostbackIds[8] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PostBackEvents', null, {});
  }
};
