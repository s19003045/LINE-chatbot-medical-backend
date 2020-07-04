'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chatbots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      botId: {
        type: Sequelize.STRING
      },
      pushMsgLimit: {
        type: Sequelize.INTEGER
      },
      pushMsgCount: {
        type: Sequelize.INTEGER
      },
      pushMsgStatus: {
        type: Sequelize.ENUM
      },
      ChannelId: {
        type: Sequelize.INTEGER
      },
      CustomerId: {
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
    return queryInterface.dropTable('Chatbots');
  }
};