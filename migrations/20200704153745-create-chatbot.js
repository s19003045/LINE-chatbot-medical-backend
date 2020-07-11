"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Chatbots", {
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
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      pushMsgCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      pushMsgStatus: {
        type: Sequelize.ENUM("available", "inactive")
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
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Chatbots");
  }
};