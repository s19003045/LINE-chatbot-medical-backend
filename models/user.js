'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.STRING,
    displayName: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    statusMessage: DataTypes.STRING,
    language: DataTypes.STRING,
    status: DataTypes.ENUM,
    interactiveStatus: DataTypes.ENUM,
    joinDate: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};