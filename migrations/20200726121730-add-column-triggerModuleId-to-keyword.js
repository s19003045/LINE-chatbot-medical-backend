'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Keywords", "triggerModuleId", Sequelize.INTEGER, {
      after: "UsedCount"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Keywords", "triggerModuleId");
  }
};
