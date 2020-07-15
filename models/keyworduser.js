'use strict';
module.exports = (sequelize, DataTypes) => {
  const KeywordUser = sequelize.define('KeywordUser', {
    KeywordId: {
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
    }
  }, {});
  KeywordUser.associate = function (models) {
    // associations can be defined here
  };
  return KeywordUser;
};