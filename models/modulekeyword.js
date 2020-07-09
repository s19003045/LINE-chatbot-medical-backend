'use strict';
module.exports = (sequelize, DataTypes) => {
  const ModuleKeyword = sequelize.define('ModuleKeyword', {
    name: DataTypes.STRING, //模組名稱
    uuid: DataTypes.STRING,
    status: DataTypes.ENUM('edited', 'in-use', 'archived'),  //模組狀態
    moduleUsedCount: {
      type: DataTypes.INTEGER, // 使用次數
      defaultValue: 0
    },
    moduleReadCount: {
      type: DataTypes.INTEGER, // 已次次數
      defaultValue: 0
    },
    ChatbotId: DataTypes.INTEGER,
  }, {
    paranoid: true,
  });
  ModuleKeyword.associate = function (models) {
    ModuleKeyword.hasOne(models.ReplyMessage)
    ModuleKeyword.hasMany(models.TextEvent)
  };
  return ModuleKeyword;
};