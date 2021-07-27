const express = require('express')
const router = express.Router()
const authentication = require('./modules/authentication')

router.get('/', (req, res) => {
    return res.json({ message: "OK" })
})

router.use(authentication);

module.exports = router