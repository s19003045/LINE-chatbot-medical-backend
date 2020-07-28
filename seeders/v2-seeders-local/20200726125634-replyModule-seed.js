'use strict';
const { v4: uuidv4 } = require('uuid');
const ChatbotId = 1


//1
const prenatalVisit = require('../../templates/replyModule_ReplyMessage_local/產前檢查.json')

//2
const healthInsuranceExam = require('../../templates/replyModule_ReplyMessage_local/查詢健保給付項目.json')

//3
const atOnesOwnExpenseExam = require('../../templates/replyModule_ReplyMessage_local/查詢自費項目.json')

//4
const queryExamByWeeks = require('../../templates/replyModule_ReplyMessage_local/依週期數查詢產檢項目.json')

//5  孕期衛教.json
const pregnancyEducation = require('../../templates/replyModule_ReplyMessage_local/孕期衛教.json')

//6 胎兒成長.json
const fetusGrowth = require('../../templates/replyModule_ReplyMessage_local/胎兒成長.json')

//7 生理記錄.json
const healthRecord = require('../../templates/replyModule_ReplyMessage_local/生理記錄.json')

//8 問與答.json
const questionAndAnswer = require('../../templates/replyModule_ReplyMessage_local/問與答.json')

//9 更多資訊.json
const moreInformation = require('../../templates/replyModule_ReplyMessage_local/更多資訊.json')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ReplyModules', [
      {
        name: '產前檢查', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        // moduleUsedCount: 0, // (略，已帶 default value)
        replyMessage:
          JSON.stringify(prenatalVisit), //id:1
        status: 'in-use', //此模組的狀態
        ChatbotId: ChatbotId, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '查詢健保給付項目', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        // moduleUsedCount: 0, // (略，已帶 default value)
        replyMessage:
          JSON.stringify(healthInsuranceExam), //id:2
        status: 'in-use', //此模組的狀態
        ChatbotId: ChatbotId, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '查詢自費項目', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        // moduleUsedCount: 0, // (略，已帶 default value)
        replyMessage:
          JSON.stringify(atOnesOwnExpenseExam), //id:3
        status: 'in-use', //此模組的狀態
        ChatbotId: ChatbotId, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '依週期數查詢產檢項目', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        // moduleUsedCount: 0, // (略，已帶 default value)
        replyMessage:
          JSON.stringify(queryExamByWeeks), //id:4
        status: 'in-use', //此模組的狀態
        ChatbotId: ChatbotId, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '孕期衛教', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        // moduleUsedCount: 0, // (略，已帶 default value)
        replyMessage:
          JSON.stringify(pregnancyEducation), //id:5
        status: 'in-use', //此模組的狀態
        ChatbotId: ChatbotId, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '胎兒成長', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        // moduleUsedCount: 0, // (略，已帶 default value)
        replyMessage:
          JSON.stringify(fetusGrowth), //id:6
        status: 'in-use', //此模組的狀態
        ChatbotId: ChatbotId, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '生理記錄', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        // moduleUsedCount: 0, // (略，已帶 default value)
        replyMessage:
          JSON.stringify(healthRecord), //id:7
        status: 'in-use', //此模組的狀態
        ChatbotId: ChatbotId, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '問與答', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        // moduleUsedCount: 0, // (略，已帶 default value)
        replyMessage:
          JSON.stringify(questionAndAnswer), //id:8
        status: 'in-use', //此模組的狀態
        ChatbotId: ChatbotId, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '更多資訊', // 模組名稱
        uuid: uuidv4(), // 使用於主控台
        // moduleUsedCount: 0, // (略，已帶 default value)
        replyMessage:
          JSON.stringify(moreInformation), //id:9
        status: 'in-use', //此模組的狀態
        ChatbotId: ChatbotId, //FK
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ReplyModules', null, {});
  }
};
