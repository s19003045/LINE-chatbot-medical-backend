'use strict';
module.exports = (sequelize, DataTypes) => {
  const TextEvent = sequelize.define('TextEvent', {
    type: {
      type: DataTypes.STRING,
      defaultValue: 'text'
    },
    uuid: DataTypes.STRING, //使用於主控台
    text: DataTypes.STRING, //關鍵字
    textEventCount: {
      type: DataTypes.INTEGER, //使用次數
      defaultValue: 0
    },
    ReplyMessageId: DataTypes.INTEGER, //FK
    ChatbotId: DataTypes.INTEGER, //FK
    ModuleKeywordId: DataTypes.INTEGER, //FK
  }, {
    paranoid: true
  });
  TextEvent.associate = function (models) {
    TextEvent.belongsTo(models.ReplyMessage)
    TextEvent.belongsTo(models.Chatbot)
    TextEvent.belongsTo(models.ModuleKeyword)
  };
  return TextEvent;
};