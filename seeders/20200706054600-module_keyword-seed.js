'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Module_keywords', [
      {
        name: '食物好吃', //模組名稱
        ReplyMessageId: 1,
        status: 'in-use',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Module_keywords', null, {});
  }
};
