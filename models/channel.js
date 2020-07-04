'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    role: DataTypes.ENUM,
    channelId: DataTypes.STRING,
    channelName: DataTypes.STRING,
    userId: DataTypes.STRING,
    botId: DataTypes.STRING,
    webhookURL: DataTypes.STRING,
    botBasicId: DataTypes.STRING,
    channelSecret: DataTypes.STRING,
    channelAccessToken: DataTypes.STRING
  }, {});
  Channel.associate = function(models) {
    // associations can be defined here
  };
  return Channel;
};