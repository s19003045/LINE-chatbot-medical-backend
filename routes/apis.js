const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.json('This is apis index page')
})


module.exports = router