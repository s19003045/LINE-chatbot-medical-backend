'use strict';
module.exports = (sequelize, DataTypes) => {
  const TextEvent = sequelize.define('TextEvent', {
    type: {
      type: DataTypes.STRING,
      defaultValue: 'text'
    },
    uuid: DataTypes.STRING,
    text: DataTypes.STRING,
    ReplyMessageId: DataTypes.INTEGER
  }, {});
  TextEvent.associate = function (models) {
    TextEvent.belongsTo(models.ReplyMessage)
  };
  return TextEvent;
};