"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("ModuleKeywords", "moduleUsedCount", Sequelize.INTEGER, {
      after: "status"
    });
    return queryInterface.addColumn("ModuleKeywords", "moduleReadCount", Sequelize.INTEGER, {
      after: "status"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("ModuleKeywords", "moduleUsedCount");
  }
};
