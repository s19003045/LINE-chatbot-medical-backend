'use strict';
module.exports = (sequelize, DataTypes) => {
  const Module_keyword = sequelize.define('Module_keyword', {
    name: DataTypes.STRING, //模組名稱
    ReplyMessageId: DataTypes.INTEGER,
    status: DataTypes.ENUM('edited', 'in-use', 'archived')  //模組狀態
  }, {});
  Module_keyword.associate = function (models) {
    Module_keyword.belongsTo(models.ReplyMessage)
  };
  return Module_keyword;
};