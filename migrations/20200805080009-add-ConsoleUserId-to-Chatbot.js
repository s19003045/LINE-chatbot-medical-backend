'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("Chatbots", "ConsoleUserId", Sequelize.INTEGER, {
      after: "pushMsgStatus"
    })
    queryInterface.addColumn("Chatbots", "CHANNEL_ID", Sequelize.STRING, {
      after: "pushMsgStatus"
    })
    queryInterface.addColumn("Chatbots", "CHANNEL_SECRET", Sequelize.STRING, {
      after: "pushMsgStatus"
    })
    queryInterface.addColumn("Chatbots", "CHANNEL_ACCESS_TOKEN", Sequelize.STRING, {
      after: "pushMsgStatus"
    })
    return queryInterface.addColumn("Chatbots", "botBasicId", Sequelize.STRING, {
      after: "pushMsgStatus"
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Chatbots", "ConsoleUserId", Sequelize.INTEGER, {
      after: "pushMsgStatus"
    })
    queryInterface.removeColumn("Chatbots", "CHANNEL_ID", Sequelize.STRING, {
      after: "pushMsgStatus"
    })
    queryInterface.removeColumn("Chatbots", "CHANNEL_SECRET", Sequelize.STRING, {
      after: "pushMsgStatus"
    })
    queryInterface.removeColumn("Chatbots", "CHANNEL_ACCESS_TOKEN", Sequelize.STRING, {
      after: "pushMsgStatus"
    })
    return queryInterface.removeColumn("Chatbots", "botBasicId", Sequelize.STRING, {
      after: "pushMsgStatus"
    })
  }
};
