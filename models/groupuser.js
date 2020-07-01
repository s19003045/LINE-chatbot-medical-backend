'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    GroupId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  GroupUser.associate = function(models) {
    // associations can be defined here
  };
  return GroupUser;
};