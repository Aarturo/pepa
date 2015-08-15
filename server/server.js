"use strict"

import express from "express"
import config from "./config"
import mongoose from "mongoose"

mongoose.connect(config.db)
const app = express()
const server = require("http").createServer(app)

require("./config/express")(app)

server.listen(config.port, function () {
  console.log(`Express app started on port ${config.port}`)
})

exports = module.exports = app