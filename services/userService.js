'use strict'

const db = require('../models')
const ConsoleUser = db.ConsoleUser
const Chatbot = db.Chatbot

// import helper
const bcrypt = require('bcrypt')
var validator = require('validator');
// JWT
const jwt = require('jsonwebtoken')

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
  signIn: async (req, res, callback) => {
    try {
      // 必填欄位不得為空
      const { email, password } = req.body
      if (!email || !password) {
        const data = {
          status: 'error',
          message: '必填欄位不得為空',
        }
        return callback(data)
      }

      // 驗證 password 格式(須包含大寫英文字母、小寫英文字母、數字，全長8個字元)
      let passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

      // 驗證 email 格式
      if (!validator.isEmail(email)) {
        const data = {
          status: 'error',
          message: 'email 格式不正確',
        }
        return callback(data)
      }

      // 驗證密碼格式
      if (!password.match(passwordRule)) {
        const data = {
          status: 'error',
          message: 'password 至少包含一個大寫英文字母、一個小寫英文字母、一個數字，長度至少8個字元',
        }
        return callback(data)
      }

      // 搜尋此帳號
      const user = await ConsoleUser.findOne({
        where: {
          email: email,
        },
        include: [
          { model: Chatbot }
        ]
      })

      // 無此使用者
      if (!user) {
        const data = {
          status: 'error',
          message: '無此帳號',
        }
        return callback(data)
      }

      if (user) {
        // 驗證密碼，密碼錯誤
        if (!bcrypt.compareSync(password, user.password)) {
          return callback({
            status: 'error',
            message: "密碼錯誤"
          })
        }

        // 驗證密碥成功
        const payload = {
          id: user.id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        }
        // 簽發 token
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        const data = {
          status: 'success',
          message: '成功登入',
          token: token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            roll: user.roll,
            avatar: user.avatar,
            Chatbots: user.Chatbots
          }
        }
        callback(data)
      }
    } catch (err) {
      const data = {
        status: 'error',
        message: '系統錯誤',
        error: err.message
      }
      callback(data)
    }
  },

  // 登出
  logout: (req, res, callback) => {
    callback('logout')
  },
}

module.exports = userService