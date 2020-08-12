const express = require('express')
const router = express.Router()
const replyMsgController = require('../controllers/apis/replyMsgController')
const analysisController = require('../controllers/apis/analysisController')
const welcomeMsgController = require('../controllers/apis/welcomeMsgController')
const userController = require('../controllers/apis/userController')


const passport = require('../config/passport')

// middleware
const authenticated = passport.authenticate('jwt', { session: false })

const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.role === 'admin') {
      return next()
    } else {
      return res.json({ status: 'error', message: 'permission denied' })
    }
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}

// user API
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/logout', userController.logout)
router.get('/get_current_user', authenticated, userController.getCurrentUser)


// 新增 module keyword
router.post('/bots/:botId/module-keyword', replyMsgController.createModuleKeyword)
// 刪除 module keyword
router.delete('/bots/:botId/module-keyword', replyMsgController.deleteModuleKeyword)



// 新增關鍵字
router.post('/bots/:botId/keyword', authenticated, replyMsgController.createKeyword)
// 取得關鍵字
router.get('/bots/:botId/keywords', authenticated, replyMsgController.getKeywords)
// 刪除關鍵字
router.delete('/bots/:botId/keyword', authenticated, replyMsgController.deleteKeyword)
// 儲存關鍵字
router.put('/bots/:botId/keyword', authenticated, replyMsgController.putKeyword)

// 新增 replyModule
router.post('/bots/:botId/reply-module', authenticated, replyMsgController.createReplyModule)
// 取得 replyModules
router.get('/bots/:botId/reply-module', authenticated, replyMsgController.getReplyModules)
// 刪除 replyModule
router.delete('/bots/:botId/reply-module', authenticated, replyMsgController.deleteReplyModule)
// 儲存 replyModule
router.put('/bots/:botId/reply-module', authenticated, replyMsgController.putReplyModule)

// 歡迎訊息設定-取得歡迎訊息資料
router.get('/bots/:botId/welcome', authenticated, welcomeMsgController.getWelcomeMsg)
// 歡迎訊息設定-儲存歡迎訊息資料
router.put('/bots/:botId/welcome', authenticated, welcomeMsgController.putWelcomeMsg)

// 分析模組-取得回應模組(replyModule)使用數據
router.get('/bots/:botId/reply-module-analysis', authenticated, analysisController.getReplyModuleAnalysis)
// 分析模組-取得關鍵字使用數據
router.get('/bots/:botId/keyword-analysis', authenticated, analysisController.getKeywordAnalysis)
// 分析模組-取得將機器人加為好友的使用者數據
router.get('/bots/:botId/user-analysis', authenticated, analysisController.getUserAnalysis)


// //====以下 API 暫時用不到===
// // 新增 reply message
// router.post('/bots/:botId/reply-message', replyMsgController.createReplyMessage)
// // 刪除 reply message
// router.delete('/bots/:botId/reply-message', replyMsgController.deleteReplyMessage)
// // 新增 text event
// router.post('/bots/:botId/text-event', replyMsgController.createTextEvent)
// // 刪除 text event
// router.delete('/bots/:botId/text-event', replyMsgController.deleteTextEvent)

// //====以下 API 暫時用不到===
// // 儲存關鍵字回應模組
// router.post('/bots/:botId/keyword-reply', replyMsgController.postKeywordReply)
// // 取得關鍵字回應模組
// router.get('/bots/:botId/keyword-reply', replyMsgController.getKeywordReply)
// // 修改關鍵字回應模組
// router.put('/bots/:botId/keyword-reply', replyMsgController.postKeywordReply)
// // 刪除關鍵字回應模組
// router.delete('/bots/:botId/keyword-reply', replyMsgController.deleteKeywordReply)

// //====以下 API 暫時用不到===
// // 新增 postback module
// router.post('/bots/:botId/module-postback', replyMsgController.createModulePostBack)
// // 刪除 postback module
// router.delete('/bots/:botId/module-postback', replyMsgController.deleteModulePostBack)
// // 取得回傳動作(postback)回應模組
// router.get('/bots/:botId/postback-reply', replyMsgController.getPostBackReply)
// // 儲存回傳動作(postback)回應模組
// router.post('/bots/:botId/postback-reply', replyMsgController.postPostBackReply)


// //====以下 API 暫時用不到===
// // 分析模組-取得關鍵字模組使用數據 =>棄用
// router.get('/bots/:botId/module-keyword-analysis', analysisController.getModuleKeywordAnalysis)
// // 分析模組-取得postback模組使用數據 =>棄用
// router.get('/bots/:botId/module-postback-analysis', analysisController.getModulePostBackAnalysis)
// // 分析模組-取得關鍵字模組使用數據 =>棄用
// router.get('/bots/:botId/reply-message-analysis', analysisController.getReplyMessageAnalysis)



module.exports = router