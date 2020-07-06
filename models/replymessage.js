'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReplyMessage = sequelize.define('ReplyMessage', {
    type: DataTypes.STRING, // reply message type
    name: DataTypes.STRING, // 模組名稱
    uuid: DataTypes.STRING, // 使用於主控台
    replyMsgCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }, // 使用此 msg 次數
    readMsgCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }, // 使用者閱讀次數
    messageTemplate: DataTypes.JSON,  // message json
    status: DataTypes.ENUM('edited', 'in-use', 'archived'), //此模組的狀態
    ChatbotId: DataTypes.INTEGER, //FK
  }, {});
  ReplyMessage.associate = function (models) {
    ReplyMessage.hasMany(models.TextEvent)
    ReplyMessage.hasOne(models.Module_keyword)
  };
  return ReplyMessage;
};