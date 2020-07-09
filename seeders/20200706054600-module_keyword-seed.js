'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ModuleKeywords', [
      {
        name: '點餐機', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        ChatbotId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: '和動物做朋友', //模組名稱
        uuid: uuidv4(),
        status: 'in-use',
        ChatbotId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ModuleKeywords', null, {});
  }
};
