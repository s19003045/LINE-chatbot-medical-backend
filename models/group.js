'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupId: DataTypes.STRING,
    groupName: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    paranoid: true
  });
  Group.associate = function (models) {
    Group.belongsToMany(models.User, { through: 'GroupUser' });
  };
  return Group;
};