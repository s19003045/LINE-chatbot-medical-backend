'use strict';
module.exports = (sequelize, DataTypes) => {
  const LineUserChatbot = sequelize.define('LineUserChatbot', {
    status: DataTypes.ENUM('join', 'leave'), //使用者與機器人的關係
    interactiveStatus: DataTypes.ENUM('active', 'mid-active', 'non-active'), //使用者與 chatbot 互動的情形，每日分析一次
    joinDate: DataTypes.DATE, //使用者將機器人加為好友的日期
    LineUserId: DataTypes.INTEGER,
    ChatbotId: DataTypes.INTEGER,
  }, {
    paranoid: true
  });
  LineUserChatbot.associate = function (models) {
    LineUserChatbot.belongsTo(models.LineUser)
  };
  return LineUserChatbot;
};