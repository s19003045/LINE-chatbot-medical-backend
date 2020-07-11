'use strict';
module.exports = (sequelize, DataTypes) => {
  const ModulePostBack = sequelize.define('ModulePostBack', {
    name: DataTypes.STRING, // postback 名稱
    uuid: DataTypes.STRING,
    moduleUsedCount: DataTypes.INTEGER, // 使用次數
    moduleReadCount: DataTypes.INTEGER, // 已讀次數
    status: DataTypes.ENUM('edited', 'in-use', 'archived'),  //模組狀態
    ChatbotId: DataTypes.INTEGER,  // FK
    ModulePostBackId: DataTypes.INTEGER  // FK
  }, {
    paranoid: true,
  });
  ModulePostBack.associate = function (models) {
    ModulePostBack.hasMany(models.PostBackEvent)
    ModulePostBack.hasOne(models.ReplyMessage)
    ModulePostBack.belongsTo(models.Chatbot)
  };
  return ModulePostBack;
};