'use strict';
module.exports = (sequelize, DataTypes) => {
  const roleFunction = sequelize.define('roleFunction', {
    appType: DataTypes.STRING,
    profile: DataTypes.BOOLEAN,
    chatMassage: DataTypes.BOOLEAN,
    openIdConnet: DataTypes.BOOLEAN,
    replyMassage: DataTypes.BOOLEAN,
    pushMassage: DataTypes.BOOLEAN,
    joinGroupChat: DataTypes.BOOLEAN,
    liffUrl: DataTypes.STRING,
    ChatbotId: DataTypes.INTEGER
  }, {});
  roleFunction.associate = function(models) {
    // associations can be defined here
  };
  return roleFunction;
};