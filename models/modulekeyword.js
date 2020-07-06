'use strict';
module.exports = (sequelize, DataTypes) => {
  const ModuleKeyword = sequelize.define('ModuleKeyword', {
    name: DataTypes.STRING, //模組名稱
    uuid: DataTypes.STRING,
    status: DataTypes.ENUM('edited', 'in-use', 'archived'),  //模組狀態
    ChatbotId: DataTypes.INTEGER,
  }, {});
  ModuleKeyword.associate = function (models) {
    ModuleKeyword.hasOne(models.ReplyMessage)
  };
  return ModuleKeyword;
};