const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
  return res.json('This is index page')
})

router.get('/send-id', (req, res) => {
  res.json({ id: process.env.LINE_LIFF_ID });
});

router.get('/liff', (req, res) => {
  console.log('__dirname:', __dirname)
  const filename = path.join(`${__dirname}/liff.html`);
  return res.sendFile(filename);
});

module.exports = router