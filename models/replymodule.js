'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReplyModule = sequelize.define('ReplyModule', {
    name: DataTypes.STRING, // postback 名稱
    uuid: DataTypes.STRING,
    moduleUsedCount: DataTypes.INTEGER, // 使用次數
    status: DataTypes.ENUM('edited', 'in-use', 'archived'),  //模組狀態
    replyMessage: {  // message json
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('replyMessage'));
      },
      set: function (value) {
        this.setDataValue('replyMessage', JSON.stringify(value));
      },
    },
    ChatbotId: DataTypes.INTEGER
  }, {
    paranoid: true,
  });
  ReplyModule.associate = function (models) {
    ReplyModule.belongsTo(models.Chatbot)
    ReplyModule.belongsToMany(models.User, { through: 'ReplyModuleUser' });

    ReplyModule.hasMany(models.Keyword, {
      foreignKey: 'triggerModuleId'
    })

    ReplyModule.hasOne(models.WelcomeMsgChatbot)
  };
  return ReplyModule;
};