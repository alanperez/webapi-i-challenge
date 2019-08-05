const express = require('express')
const server = express();
const serverConfig = require('./serverConfig')
// middleware
serverConfig(server)

// routes
const userRouter = require('../routes/userRouter')


//endpoints 
server.use("/users", userRouter)

server.get('/', (req,res) => {
  res.send('The Homies')
})

module.exports = server;