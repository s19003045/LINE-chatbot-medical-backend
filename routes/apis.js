const express = require('express')
const router = express.Router()
const replyMsgController = require('../controllers/apis/replyMsgController')
const analysisController = require('../controllers/apis/analysisController')


// 新增 module keyword
router.post('/bots/:botId/module-keyword', replyMsgController.createModuleKeyword)
// 刪除 module keyword
router.delete('/bots/:botId/module-keyword', replyMsgController.deleteModuleKeyword)

// //====以下 API 暫時用不到===
// // 新增 reply message
// router.post('/bots/:botId/reply-message', replyMsgController.createReplyMessage)
// // 刪除 reply message
// router.delete('/bots/:botId/reply-message', replyMsgController.deleteReplyMessage)
// // 新增 text event
// router.post('/bots/:botId/text-event', replyMsgController.createTextEvent)
// // 刪除 text event
// router.delete('/bots/:botId/text-event', replyMsgController.deleteTextEvent)

// 新增關鍵字
router.post('/bots/:botId/keyword', replyMsgController.createKeyword)



// 儲存關鍵字回應模組
router.post('/bots/:botId/keyword-reply', replyMsgController.postKeywordReply)
// 取得關鍵字回應模組
router.get('/bots/:botId/keyword-reply', replyMsgController.getKeywordReply)
// 修改關鍵字回應模組
router.put('/bots/:botId/keyword-reply', replyMsgController.postKeywordReply)
// 刪除關鍵字回應模組
router.delete('/bots/:botId/keyword-reply', replyMsgController.deleteKeywordReply)


// 新增 postback module
router.post('/bots/:botId/module-postback', replyMsgController.createModulePostBack)
// 取得回傳動作(postback)回應模組
router.get('/bots/:botId/postback-reply', replyMsgController.getPostBackReply)
// 儲存回傳動作(postback)回應模組
router.post('/bots/:botId/postback-reply', replyMsgController.postPostBackReply)


// 分析模組-取得關鍵字模組使用數據
router.get('/bots/:botId/module-keyword-analysis', analysisController.getModuleKeywordAnalysis)
// 分析模組-取得postback模組使用數據
router.get('/bots/:botId/module-postback-analysis', analysisController.getModulePostBackAnalysis)
// 分析模組-取得關鍵字模組使用數據
router.get('/bots/:botId/reply-message-analysis', analysisController.getReplyMessageAnalysis)


module.exports = router