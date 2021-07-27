const express = require('express')
const router = express.Router()
const authentication = require('./modules/authentication')

router.get('/', (req, res) => {
  return res.json({ message: "OK" })
})

router.get('/youtube', (req, res) => {
  console.log(req.query);
  const html = `
  <html>
    <head></head>
    <body>
      <div>Hellooooooo</div>
    </body>
  </html>`
  return res.status(201).send(html)
})

router.use(authentication);

module.exports = router