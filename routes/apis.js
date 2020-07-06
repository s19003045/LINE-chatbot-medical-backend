const express = require('express')
const router = express.Router()
const replyMsgController = require('../controllers/apis/replyMsgController')


// 建立 text event 及對應的 reply message 
router.post('/keyword-reply', replyMsgController.createKeywordReply)
// 建立 text event 及對應的 reply message 
router.get('/keyword-reply', replyMsgController.getKeywordReply)
// 修改 text event 及對應的 reply message 
router.put('/keyword-reply', replyMsgController.putKeywordReply)
// 封存針對 text event 的 reply message 
router.delete('/keyword-reply', replyMsgController.deleteKeywordReply)



module.exports = router