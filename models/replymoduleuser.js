'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReplyModuleUser = sequelize.define('ReplyModuleUser', {
    ReplyModuleId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    paranoid: true,
  });
  ReplyModuleUser.associate = function (models) {
    // associations can be defined here
  };
  return ReplyModuleUser;
};