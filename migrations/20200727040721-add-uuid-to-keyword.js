'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Keywords", "uuid", Sequelize.STRING, {
      after: "UsedCount"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Keywords", "uuid");
  }
};
