'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupId: DataTypes.STRING,
    groupName: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};