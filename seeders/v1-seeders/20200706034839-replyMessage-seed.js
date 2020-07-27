'use strict';
const { v4: uuidv4 } = require('uuid');
const ChatbotId = 1

const ModuleKeywordIds = [1, 7, 8, 9, 2, 3, 4, 5, 6]
const ModulePostBackIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const autoIncrementNum = 10; //local DB 設定1，若為 heroku mySQL DB 則須改為10

//1
const prenatalVisit = require('../../templates/postbacks/產前檢查.json')

//2
const healthInsuranceExam = require('../../templates/postbacks/查詢健保給付項目.json')

//3
const atOnesOwnExpenseExam = require('../../templates/postbacks/查詢自費項目.json')

//4
const queryExamByWeeks = require('../../templates/postbacks/依週期數查詢產檢項目.json')

//5  孕期衛教.json
const pregnancyEducation = require('../../templates/postbacks/孕期衛教.json')

//6 胎兒成長.json
const fetusGrowth = require('../../templates/postbacks/胎兒成長.json')

//7 生理記錄.json
const healthRecord = require('../../templates/postbacks/生理記錄.json')

//8 問與答.json
const questionAndAnswer = require('../../templates/postbacks/問與答.json')

//9 更多資訊.json
const moreInformation = require('../../templates/postbacks/更多資訊.json')



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ReplyMessages', [
      {
        type: 'text', // reply message type
        name: '產前檢查', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        messageTemplate:
          JSON.stringify(prenatalVisit), //id:1
        status: 'in-use', //此模組的狀態
        ChatbotId: 1, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[0] - 1),  //FK
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostBackIds[0] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'text', // reply message type
        name: '查詢健保給付項目', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        messageTemplate:
          JSON.stringify(healthInsuranceExam), //id:2
        status: 'in-use', //此模組的狀態
        ChatbotId: 1, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[1] - 1),  //FK
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostBackIds[1] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'text', // reply message type
        name: '查詢自費項目', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        messageTemplate:
          JSON.stringify(atOnesOwnExpenseExam), //id:3
        status: 'in-use', //此模組的狀態
        ChatbotId: 1, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[2] - 1),  //FK
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostBackIds[2] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'text', // reply message type
        name: '依週期數查詢產檢項目', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        messageTemplate:
          JSON.stringify(queryExamByWeeks), //id:4
        status: 'in-use', //此模組的狀態
        ChatbotId: 1, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[3] - 1),  //FK
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostBackIds[3] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        type: 'text', // reply message type
        name: '孕期衛教', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        messageTemplate:
          JSON.stringify(pregnancyEducation), //id:5
        status: 'in-use', //此模組的狀態
        ChatbotId: 1, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[4] - 1),  //FK
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostBackIds[4] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'text', // reply message type
        name: '胎兒成長', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        messageTemplate:
          JSON.stringify(fetusGrowth), //id:6
        status: 'in-use', //此模組的狀態
        ChatbotId: 1, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[5] - 1),  //FK
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostBackIds[5] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'text', // reply message type
        name: '生理記錄', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        messageTemplate:
          JSON.stringify(healthRecord), //id:7
        status: 'in-use', //此模組的狀態
        ChatbotId: 1, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[6] - 1),  //FK
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostBackIds[6] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'text', // reply message type
        name: '問與答', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        messageTemplate:
          JSON.stringify(questionAndAnswer), //id:8
        status: 'in-use', //此模組的狀態
        ChatbotId: 1, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[7] - 1),  //FK
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostBackIds[7] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'text', // reply message type
        name: '更多資訊', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        messageTemplate:
          JSON.stringify(moreInformation), //id:9
        status: 'in-use', //此模組的狀態
        ChatbotId: 1, //FK
        ModuleKeywordId: 1 + autoIncrementNum * (ModuleKeywordIds[8] - 1),  //FK
        ModulePostBackId: 1 + autoIncrementNum * (ModulePostBackIds[8] - 1),  //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ReplyMessages', null, {});
  }
};
