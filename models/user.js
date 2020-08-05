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
  }, {
    paranoid: true
  });
  User.associate = function (models) {
    User.belongsToMany(models.Keyword, { through: 'KeywordUsers' });

    User.belongsToMany(models.ReplyModule, { through: 'ReplyModuleUser' });
  };
  return User;
};