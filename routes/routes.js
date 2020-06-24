const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.json('This is index page')
})

module.exports = router