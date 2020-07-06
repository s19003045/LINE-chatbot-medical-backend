'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,  //客戶的姓名
    email: DataTypes.STRING,  //客戶的 email
    avatar: DataTypes.STRING  //客戶的大頭照網址
  }, {
    paranoid: true
  });
  Customer.associate = function (models) {
    Customer.hasMany(models.Chatbot)
  };
  return Customer;
};