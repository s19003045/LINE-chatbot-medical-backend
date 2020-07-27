'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Keywords", "status", Sequelize.STRING, {
      after: "UsedCount"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Keywords", "status");
  }
};
