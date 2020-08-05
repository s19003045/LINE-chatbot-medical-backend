'use strict';
module.exports = (sequelize, DataTypes) => {
  const WelcomeMsgChatbot = sequelize.define('WelcomeMsgChatbot', {
    status: {
      type: DataTypes.ENUM('edited', 'in-use', 'archived'),  //歡迎訊息是否啟用，不啟用('edited')/啟用('in-use')/刪除('archived')
      defaultValue: 'edited'
    },
    ChatbotId: DataTypes.INTEGER,
    ReplyModluleId: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  WelcomeMsgChatbot.associate = function (models) {
    WelcomeMsgChatbot.belongsTo(models.Chatbot)
    WelcomeMsgChatbot.belongsTo(models.ReplyModule)
  };
  return WelcomeMsgChatbot;
};