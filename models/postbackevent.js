'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostBackEvent = sequelize.define('PostBackEvent', {
    name: DataTypes.STRING,
    uuid: DataTypes.STRING,
    eventType: {
      type: DataTypes.STRING,
      defaultValue: 'postBack'
    },
    subject: DataTypes.STRING,  // 相同於 name
    data: DataTypes.STRING,
    postEventCount: {
      type: DataTypes.INTEGER,  // 使用次數
      defaultValue: 0
    },
    ReplyMessageId: DataTypes.INTEGER,  // FK
    ChatbotId: DataTypes.INTEGER,  // FK
    ModulePostBackId: DataTypes.INTEGER,  // FK
    modulePostBackUuid: DataTypes.STRING,
  }, {
    paranoid: true,
  });
  PostBackEvent.associate = function (models) {
    PostBackEvent.belongsTo(models.ModulePostBack)
    PostBackEvent.belongsTo(models.ReplyMessage)
    PostBackEvent.belongsTo(models.Chatbot)
  };
  return PostBackEvent;
};