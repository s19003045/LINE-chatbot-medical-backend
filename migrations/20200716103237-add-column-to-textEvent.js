'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("TextEvents", "moduleKeywordUuid", Sequelize.STRING, {
      after: "status"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("TextEvents", "moduleKeywordUuid");
  }
};
