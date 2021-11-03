const express = require('express')

const UserRouter = require('./users/user-router.js')

const server = express()

server.use(express.json())
server.use('/api/users', UserRouter)
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = server
