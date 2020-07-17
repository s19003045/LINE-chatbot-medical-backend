'use strict';
const { v4: uuidv4 } = require('uuid');
const ChatbotId = 1

const ReplyMessageIds = [1, 5, 6, 7, 8, 9, 2, 3, 4]
const ModuleKeywordIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const autoIncrementNum = 1; //local DB 設定1，若為 heroku mySQL DB 則須改為10

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TextEvents', [
      {
        uuid: uuidv4(), //使用於主控台
        text: '產前檢查', //關鍵字
        textEventCount: 0, //使用次數
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[0] - 1), //FK
        ChatbotId: ChatbotId, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
        text: '孕期衛教', //關鍵字
        textEventCount: 0, //使用次數
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[1] - 1), //FK
        ChatbotId: ChatbotId, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[1] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
        text: '胎兒成長', //關鍵字
        textEventCount: 0, //使用次數
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[2] - 1), //FK
        ChatbotId: ChatbotId, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[2] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
        text: '生理記錄', //關鍵字
        textEventCount: 0, //使用次數
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[3] - 1), //FK
        ChatbotId: ChatbotId, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[3] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
        text: '問與答', //關鍵字
        textEventCount: 0, //使用次數
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[4] - 1), //FK
        ChatbotId: ChatbotId, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[4] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
        text: '更多資訊', //關鍵字
        textEventCount: 0, //使用次數
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[5] - 1), //FK
        ChatbotId: ChatbotId, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[5] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
        text: '查詢健保給付項目', //關鍵字
        textEventCount: 0, //使用次數
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[6] - 1), //FK
        ChatbotId: ChatbotId, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[6] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
        text: '查詢自費項目', //關鍵字
        textEventCount: 0, //使用次數
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[7] - 1), //FK
        ChatbotId: ChatbotId, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[7] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uuid: uuidv4(), //使用於主控台
        text: '依週期數查詢產檢項目', //關鍵字
        textEventCount: 0, //使用次數
        ReplyMessageId: 1 + autoIncrementNum * (ReplyMessageIds[8] - 1), //FK
        ChatbotId: ChatbotId, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[8] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TextEvents', null, {});
  }
};
