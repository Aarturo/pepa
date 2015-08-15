"use strict"

const fs = require("fs")
if (fs.existsSync(`${__dirname}/../../.env`)) {
  require("dotenv").config({path: `${__dirname}/../../.env`})
}

module.exports = {
  env: process.env.NODE_ENV || "development",
  db: process.env.MONGODB_URI || "mongodb://localhost/pepa",
  root: `${__dirname}/../..`,
  port: process.env.PORT || 3000,
  noReply: process.env.NO_REPLY || "aacg1986@gmail.com",
  secret: process.env.SECRET || "68G6NO4TFy786aF97Ke3pB43Zne06m"
}