const userService = require('../../services/userService')

const userController = {
  // 註冊
  signUp: (req, res) => {
    return userService.signUp(req, res, (data) => {
      return res.json(data)
    })
  },
  // 登入
  signIn: (req, res) => {
    return userService.signIn(req, res, (data) => {
      return res.json(data)
    })
  },
  // 登出
  logOut: (req, res) => {
    return userService.logOut(req, res, (data) => {
      return res.json(data)
    })
  },
  // 取得使用者資料
  getCurrentUser: (req, res) => {
    return userService.getCurrentUser(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = userController