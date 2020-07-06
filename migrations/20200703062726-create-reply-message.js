'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ReplyMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      uuid: {
        type: Sequelize.STRING
      },
      replyMsgCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      readMsgCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      messageTemplate: {
        type: Sequelize.JSON
      },
      status: {
        type: Sequelize.ENUM('edited', 'in-use', 'archived')
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ReplyMessages');
  }
};