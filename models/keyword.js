'use strict';
module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    name: DataTypes.STRING,  //關鍵字名稱
    uuid: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('edited', 'in-use', 'archived'),  //模組狀態
      defaultValue: 'edited'
    },
    usedCount: {
      type: DataTypes.INTEGER,  //使用者呼叫次數
      defaultValue: 0
    },
    triggerModuleId: DataTypes.INTEGER,
    ChatbotId: DataTypes.INTEGER,
  }, {
    paranoid: true
  });
  Keyword.associate = function (models) {
    Keyword.belongsToMany(models.User, { through: 'KeywordUsers' });
    Keyword.belongsTo(models.Chatbot)
    Keyword.belongsTo(models.ReplyModule, {
      foreignKey: 'triggerModuleId'
    })
  };
  return Keyword;
};