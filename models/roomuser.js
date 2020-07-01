'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoomUser = sequelize.define('RoomUser', {
    RoomId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  RoomUser.associate = function(models) {
    // associations can be defined here
  };
  return RoomUser;
};