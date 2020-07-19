'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("ReplyMessages", "modulePostBackUuid", Sequelize.STRING, {
      after: "status"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("ReplyMessages", "modulePostBackUuid");
  }
};
