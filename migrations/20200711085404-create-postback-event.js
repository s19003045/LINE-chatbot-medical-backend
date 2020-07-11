'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostBackEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      uuid: {
        type: Sequelize.STRING
      },
      eventType: {
        type: Sequelize.STRING,
        defaultValue: "postBack"
      },
      subject: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.STRING
      },
      postEventCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      ReplyMessageId: {
        type: Sequelize.INTEGER
      },
      ChatbotId: {
        type: Sequelize.INTEGER
      },
      ModulePostBackId: {
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
    return queryInterface.dropTable('PostBackEvents');
  }
};