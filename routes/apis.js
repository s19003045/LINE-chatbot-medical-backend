const express = require('express')
const router = express.Router()
const replyMsgController = require('../controllers/apis/replyMsgController')

// 新增 module keyword
router.post('/bots/:botId/module-keyword', replyMsgController.createModuleKeyword)
// 刪除 module keyword
router.delete('/bots/:botId/module-keyword', replyMsgController.deleteModuleKeyword)
// 新增 reply message
router.post('/bots/:botId/reply-message', replyMsgController.createReplyMessage)
// 刪除 reply message
router.delete('/bots/:botId/reply-message', replyMsgController.deleteReplyMessage)
// 新增 text event
router.post('/bots/:botId/text-event', replyMsgController.createTextEvent)
// 刪除 text event
router.delete('/bots/:botId/text-event', replyMsgController.deleteTextEvent)


// 儲存關鍵字回應模組
router.post('/bots/:botId/keyword-reply', replyMsgController.postKeywordReply)
// 取得關鍵字回應模組
router.get('/bots/:botId/keyword-reply', replyMsgController.getKeywordReply)
// 修改關鍵字回應模組
router.put('/bots/:botId/keyword-reply', replyMsgController.postKeywordReply)
// 刪除關鍵字回應模組
router.delete('/bots/:botId/keyword-reply', replyMsgController.deleteKeywordReply)



module.exports = router