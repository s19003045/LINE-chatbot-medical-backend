'use strict';
const { v4: uuidv4 } = require('uuid');
const ChatbotId = 1

const ReplyModuleIds = [1, 5, 6, 7, 8, 9, 2, 3, 4]

const autoIncrementNum = 1; //local DB 設定1，若為 heroku mySQL DB 則須改為10


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Keywords', [
      {
        name: '產前檢查', //關鍵字
        ChatbotId: ChatbotId, //FK
        // UsedCount: 0, // (略，已帶 default value)
        uuid: uuidv4(),
        triggerModuleId: 1 + autoIncrementNum * (ReplyModuleIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '孕期衛教', //關鍵字
        ChatbotId: ChatbotId, //FK
        // UsedCount: 0, // (略，已帶 default value)
        uuid: uuidv4(),
        triggerModuleId: 1 + autoIncrementNum * (ReplyModuleIds[1] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '胎兒成長', //關鍵字
        ChatbotId: ChatbotId, //FK
        // UsedCount: 0, // (略，已帶 default value)
        uuid: uuidv4(),
        triggerModuleId: 1 + autoIncrementNum * (ReplyModuleIds[2] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '生理記錄', //關鍵字
        ChatbotId: ChatbotId, //FK
        // UsedCount: 0, // (略，已帶 default value)
        uuid: uuidv4(),
        triggerModuleId: 1 + autoIncrementNum * (ReplyModuleIds[3] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '問與答', //關鍵字
        ChatbotId: ChatbotId, //FK
        // UsedCount: 0, // (略，已帶 default value)
        uuid: uuidv4(),
        triggerModuleId: 1 + autoIncrementNum * (ReplyModuleIds[4] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '更多資訊', //關鍵字
        ChatbotId: ChatbotId, //FK
        // UsedCount: 0, // (略，已帶 default value)
        uuid: uuidv4(),
        triggerModuleId: 1 + autoIncrementNum * (ReplyModuleIds[5] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '查詢健保給付項目', //關鍵字
        ChatbotId: ChatbotId, //FK
        // UsedCount: 0, // (略，已帶 default value)
        uuid: uuidv4(),
        triggerModuleId: 1 + autoIncrementNum * (ReplyModuleIds[6] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '查詢自費項目', //關鍵字
        ChatbotId: ChatbotId, //FK
        // UsedCount: 0, // (略，已帶 default value)
        uuid: uuidv4(),
        triggerModuleId: 1 + autoIncrementNum * (ReplyModuleIds[7] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '依週期數查詢產檢項目', //關鍵字
        ChatbotId: ChatbotId, //FK
        // UsedCount: 0, // (略，已帶 default value)
        uuid: uuidv4(),
        triggerModuleId: 1 + autoIncrementNum * (ReplyModuleIds[8] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Keywords', null, {});
  }
};
