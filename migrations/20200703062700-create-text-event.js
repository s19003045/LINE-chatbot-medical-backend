'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TextEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: 'text',
      },
      uuid: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      textEventCount: {
        type: Sequelize.INTEGER
      },
      ReplyMessageId: {
        type: Sequelize.INTEGER
      },
      ChatbotId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TextEvents');
  }
};