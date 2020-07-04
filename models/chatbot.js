'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
    botId: DataTypes.STRING,
    pushMsgLimit: DataTypes.INTEGER,
    pushMsgCount: DataTypes.INTEGER,
    pushMsgStatus: DataTypes.ENUM,
    ChannelId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER
  }, {});
  Chatbot.associate = function(models) {
    // associations can be defined here
  };
  return Chatbot;
};