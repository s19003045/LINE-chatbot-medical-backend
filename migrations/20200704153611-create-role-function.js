'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roleFunctions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appType: {
        type: Sequelize.STRING
      },
      profile: {
        type: Sequelize.BOOLEAN
      },
      chatMassage: {
        type: Sequelize.BOOLEAN
      },
      openIdConnet: {
        type: Sequelize.BOOLEAN
      },
      replyMassage: {
        type: Sequelize.BOOLEAN
      },
      pushMassage: {
        type: Sequelize.BOOLEAN
      },
      joinGroupChat: {
        type: Sequelize.BOOLEAN
      },
      liffUrl: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('roleFunctions');
  }
};