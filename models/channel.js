'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    role: DataTypes.ENUM('msgAPI', 'lineLogin'), //channel 類別
    channelId: DataTypes.STRING, //官方提供之 channel id
    channelName: DataTypes.STRING, //channel 名稱，客戶自行設定
    userId: DataTypes.STRING, //官方提供
    botId: DataTypes.STRING, //Server 端建立,用於 webhookURL 及 主控台URL
    webhookURL: DataTypes.STRING, //Server 幫客戶產生的 URL
    botBasicId: DataTypes.STRING, //用於加好友
    channelSecret: DataTypes.STRING, //機密資訊
    channelAccessToken: DataTypes.STRING //機密資訊
  }, {
    paranoid: true
  });
  Channel.associate = function (models) {
    Channel.hasOne(models.Chatbot)
  };
  return Channel;
};