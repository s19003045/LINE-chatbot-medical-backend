'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LineUserChatbots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('join', 'leave'),
      },
      interactiveStatus: {
        type: Sequelize.ENUM('active', 'mid-active', 'non-active'),
      },
      joinDate: {
        type: Sequelize.DATE
      },
      LineUserId: {
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
    return queryInterface.dropTable('LineUserChatbots');
  }
};