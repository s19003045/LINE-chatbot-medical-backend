'use strict'

const db = require('../models')
const ConsoleUser = db.ConsoleUser


// import helper
const bcrypt = require('bcrypt')
var validator = require('validator');


const userService = {
  // 註冊
  signUp: async (req, res, callback) => {
    // 必填欄位不得為空
    if (!req.body.passwordCheck || !req.body.password || !req.body.email) {
      const data = {
        status: 'error',
        message: '必填欄位不得為空',
      }
      return callback(data)
    }

    // 密碼不一致
    if (req.body.password !== req.body.passwordCheck) {
      const data = {
        status: 'error',
        message: '密碼不一致',
      }
      return callback(data)
    }

    // 驗證 password 格式(須包含大寫英文字母、小寫英文字母、數字，全長8個字元)
    let passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

    // 驗證 email 格式
    if (!validator.isEmail(req.body.email)) {
      const data = {
        status: 'error',
        message: 'email 格式不正確',
      }
      return callback(data)
    }

    // 驗證密碼格式
    if (!req.body.password.match(passwordRule)) {
      const data = {
        status: 'error',
        message: 'password 至少包含一個大寫英文字母、一個小寫英文字母、一個數字，長度至少8個字元',
      }
      return callback(data)
    }

    // 搜尋此帳號是否被使用
    const user = await ConsoleUser.findOne({
      where: {
        email: req.body.email
      }
    })

    // 使用者已存在
    if (user) {
      const data = {
        status: 'error',
        message: '該帳號已被使用',
      }
      return callback(data)
    } else {
      // 使用未存在，建立一個新的使用者
      const userCreate = await ConsoleUser.create({
        name: req.body.name ? req.body.name : '',
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      })
      if (userCreate) {
        const data = {
          status: 'success',
          message: '成功建立帳號',
        }
        callback(data)
      } else {
        const data = {
          status: 'error',
          message: '建立帳號失敗',
        }
        callback(data)
      }
    }
  },

  // 登入
  signIn: (req, res, callback) => {
    callback('singin')
  },

  // 登出
  logout: (req, res, callback) => {
    callback('logout')
  },
}

module.exports = userService