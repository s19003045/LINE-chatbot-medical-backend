'use strict';
module.exports = (sequelize, DataTypes) => {
  const WelcomeMsg = sequelize.define('WelcomeMsg', {
    name: DataTypes.STRING, // postback 名稱
    uuid: DataTypes.STRING,
    moduleUsedCount: {
      type: DataTypes.INTEGER,  //使用者呼叫次數
      defaultValue: 0
    },
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
  WelcomeMsg.associate = function (models) {

  };
  return WelcomeMsg;
};