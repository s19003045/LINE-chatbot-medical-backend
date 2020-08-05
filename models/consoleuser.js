'use strict';
module.exports = (sequelize, DataTypes) => {
  const ConsoleUser = sequelize.define('ConsoleUser', {
    name: DataTypes.STRING, //平台使用者姓名
    password: DataTypes.STRING, //平台使用者註冊密碼
    email: DataTypes.STRING, //平台使用者註冊帳號
    avatar: DataTypes.STRING, //平台使用者頭像圖片連結
    role: DataTypes.ENUM('admin', 'user'), //平台使用者角色
  }, {
    paranoid: true
  });
  ConsoleUser.associate = function (models) {
    ConsoleUser.hasMany(models.Chatbot)
  };
  return ConsoleUser;
};