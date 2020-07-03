const express = require('express')
const router = express.Router()
const replyMsgController = require('../controllers/apis/replyMsgController')


// 建立 text event 及對應的 reply message 
router.post('/text-event', replyMsgController.createTextEvent)
// 建立 text event 及對應的 reply message 
router.get('/text-event', replyMsgController.getTextEvents)
// 修改 text event 及對應的 reply message 
router.put('/text-event', replyMsgController.putTextEvent)
// 封存針對 text event 的 reply message 
router.delete('/text-event', replyMsgController.deleteTextEvent)



module.exports = router