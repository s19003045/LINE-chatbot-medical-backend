'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("PostBackEvents", "modulePostBackUuid", Sequelize.STRING, {
      after: "status"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("PostBackEvents", "modulePostBackUuid");
  }
};
