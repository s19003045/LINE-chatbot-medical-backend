'use strict';
module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    name: DataTypes.STRING,  //關鍵字名稱
    ChatbotId: DataTypes.INTEGER,
    UsedCount: {
      type: DataTypes.INTEGER,  //使用者呼叫次數
      defaultValue: 0
    },
    triggerModuleId: DataTypes.INTEGER,
  }, {
    paranoid: true
  });
  Keyword.associate = function (models) {
    Keyword.belongsToMany(models.User, { through: 'KeywordUsers' });
    Keyword.belongsTo(models.Chatbot)
    Keyword.belongsTo(models.ReplyModule)
  };
  return Keyword;
};