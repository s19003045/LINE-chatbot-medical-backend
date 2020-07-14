"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("ModuleKeywords", "moduleUsedCount", {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }, {
      after: "status"
    });
    return queryInterface.addColumn("ModuleKeywords", "moduleReadCount",
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }, {
      after: "status"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("ModuleKeywords", "moduleUsedCount");
  }
};
