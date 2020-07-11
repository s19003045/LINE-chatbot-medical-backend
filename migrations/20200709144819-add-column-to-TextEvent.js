"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TextEvents", "ModuleKeywordId", Sequelize.INTEGER, {
      after: "textEventCount"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TextEvents", "ModuleKeywordId");
  }
};
