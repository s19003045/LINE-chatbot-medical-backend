'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    roomId: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  Room.associate = function (models) {
    Room.belongsToMany(models.User, { through: 'RoomUser' });
  };
  return Room;
};