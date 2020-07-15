'use strict';
module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    name: DataTypes.STRING,  //關鍵字名稱
    ChatbotId: DataTypes.INTEGER,
    UsedCount: {
      type: DataTypes.INTEGER,  //使用者呼叫次數
      defaultValue: 0
    },
  }, {});
  Keyword.associate = function (models) {
    Keyword.belongsToMany(User, { through: models.KeywordUsers });
    Keyword.belongsTo(models.Chatbot)
  };
  return Keyword;
};