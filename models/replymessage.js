'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReplyMessage = sequelize.define('ReplyMessage', {
    type: DataTypes.STRING, // reply message type
    uuid: DataTypes.STRING,
    replyMsgCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }, // 使用此 msg 次數
    readMsgCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }, // 使用者閱讀次數
    messageTemplate: DataTypes.JSON,  // message json
    status: DataTypes.ENUM('edited', 'in-use', 'archived')
  }, {});
  ReplyMessage.associate = function (models) {
    ReplyMessage.hasMany(models.TextEvent)
  };
  return ReplyMessage;
};