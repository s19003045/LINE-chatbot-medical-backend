'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.STRING,
    displayName: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    statusMessage: DataTypes.STRING,
    language: DataTypes.STRING,
    status: DataTypes.ENUM("join", "leave"),
    interactiveStatus: DataTypes.ENUM("active", "midactive", "noactive"),
    joinDate: DataTypes.DATE
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};