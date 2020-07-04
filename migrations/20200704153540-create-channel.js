'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Channels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.ENUM('msgAPI', 'lineLogin')
      },
      channelId: {
        type: Sequelize.STRING
      },
      channelName: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      botId: {
        type: Sequelize.STRING
      },
      webhookURL: {
        type: Sequelize.STRING
      },
      botBasicId: {
        type: Sequelize.STRING
      },
      channelSecret: {
        type: Sequelize.STRING
      },
      channelAccessToken: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Channels');
  }
};