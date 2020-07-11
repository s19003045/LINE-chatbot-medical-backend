"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("ReplyMessages", "ModulePostBackId", Sequelize.INTEGER, {
      after: "status"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("ReplyMessages", "ModulePostBackId");
  }
};
