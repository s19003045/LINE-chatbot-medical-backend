'use strict';
module.exports = (sequelize, DataTypes) => {
  const LineUser = sequelize.define('LineUser', {
    userId: DataTypes.STRING, //官方提供的 line userId
    displayName: DataTypes.STRING, //顯示於聊天室的名字
    pictureUrl: DataTypes.STRING,
    statusMessage: DataTypes.STRING,
    language: DataTypes.STRING,
  }, {
    paranoid: true
  });
  LineUser.associate = function (models) {
    LineUser.hasMany(models.LineUserChatbot)
  };
  return LineUser;
};