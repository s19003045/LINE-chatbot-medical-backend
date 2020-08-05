'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
    botId: DataTypes.STRING, //Server 端建立,用於 webhookURL 及 主控台URL
    pushMsgLimit: DataTypes.INTEGER, //主動推播訊息量上限
    pushMsgCount: DataTypes.INTEGER, //主動推播量統計
    pushMsgStatus: DataTypes.ENUM('available', 'inactive'), //是否可繼續推播
    CHANNEL_ID: DataTypes.STRING, //官方提供
    CHANNEL_SECRET: DataTypes.STRING,  //官方提供，用於身份驗證
    CHANNEL_ACCESS_TOKEN: DataTypes.STRING, //官方提供，用於身份驗證
    botBasicId: DataTypes.STRING, // 官方提供，用於加好友
    ChannelId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER,
    ConsoleUserId: DataTypes.INTEGER, //平台管理者(使用者)
  }, {
    paranoid: true
  });
  Chatbot.associate = function (models) {
    Chatbot.belongsTo(models.Channel)
    Chatbot.belongsTo(models.Customer)
    Chatbot.belongsTo(models.ConsoleUser)
    Chatbot.hasMany(models.LineUserChatbot)

    Chatbot.hasMany(models.TextEvent)
    Chatbot.hasMany(models.ReplyMessage)
    Chatbot.hasMany(models.ModuleKeyword)
    Chatbot.hasMany(models.PostBackEvent)
    Chatbot.hasMany(models.ModulePostBack)
    Chatbot.hasMany(models.Keyword)
    Chatbot.hasMany(models.ReplyModule)

    Chatbot.hasOne(models.WelcomeMsgChatbot)
  };
  return Chatbot;
};