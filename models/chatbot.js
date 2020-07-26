'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
    botId: DataTypes.STRING, //Server 端建立,用於 webhookURL 及 主控台URL
    pushMsgLimit: DataTypes.INTEGER, //主動推播訊息量上限
    pushMsgCount: DataTypes.INTEGER, //主動推播量統計
    pushMsgStatus: DataTypes.ENUM('available', 'inactive'), //是否可繼續推播
    ChannelId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  Chatbot.associate = function (models) {
    Chatbot.belongsTo(models.Channel)
    Chatbot.belongsTo(models.Customer)
    Chatbot.belongsTo(models.User)

    Chatbot.hasMany(models.TextEvent)
    Chatbot.hasMany(models.ReplyMessage)
    Chatbot.hasMany(models.ModuleKeyword)
    Chatbot.hasMany(models.PostBackEvent)
    Chatbot.hasMany(models.ModulePostBack)
    Chatbot.hasMany(models.Keyword)
    Chatbot.hasMany(models.ReplyModule)
  };
  return Chatbot;
};