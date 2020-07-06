const express = require('express')
const router = express.Router()
const replyMsgController = require('../controllers/apis/replyMsgController')


// 建立 text event 及對應的 reply message 
router.post('/bots/:botId/keyword-reply', replyMsgController.createKeywordReply)
// 建立 text event 及對應的 reply message 
router.get('/bots/:botId/keyword-reply', replyMsgController.getKeywordReply)
// 修改 text event 及對應的 reply message 
router.put('/bots/:botId/keyword-reply', replyMsgController.putKeywordReply)
// 封存針對 text event 的 reply message 
router.delete('/bots/:botId/keyword-reply', replyMsgController.deleteKeywordReply)



module.exports = router