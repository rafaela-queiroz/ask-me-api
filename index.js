require('colors')
const express = require('express')
const server = express()
const port = process.env.PORT || 5000;
const router = require('./router')

const cors = require('cors')
const morgan = require('morgan')

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))
server.use(morgan('tiny'))

server.use(router)

server.listen(port, () => {
  console.info(`AskMe API Mock is running on port: ${port}`.rainbow)
})