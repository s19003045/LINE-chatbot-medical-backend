'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ReplyMessages', 'ModulePostBackId', Sequelize.INTEGER, {
      after: 'textEventCount'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('ReplyMessages', 'ModulePostBackId');
  }
};
