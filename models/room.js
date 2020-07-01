'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    roomId: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};