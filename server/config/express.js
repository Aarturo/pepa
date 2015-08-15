"use strict"

import path from "path"
import express from "express"
import compress from "compression"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import config from "./index"
import fs from "fs"

const logStream = {
  write: function(message) {
    return console.log(message.replace("\n", ""))
  }
}

module.exports = (app) => {
  app.set("showStackError", true)
  app.locals.pretty = true
  app.use(compress({
    filter: (req, res) => {
      return /json|text|javascript|css/.test(res.getHeader("Content-Type"))
    },
    level: 9
  }))
  app.use(morgan("dev", {stream: logStream}))
  app.enable("jsonp callback")
  app.enable("trust proxy")
  app.use(cookieParser(config.secret))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.env = config.env
    res.locals.port = config.port
    return next()
  })
  app.use(express.static(path.join(config.root, "public")))
  const routesPath = path.join(config.root, "server", "app", "routes")
  function walkRoutes (directory) {
    return fs.readdirSync(directory).forEach( file => {
      const newPath = `${directory}/${file}`
      const stat = fs.statSync(newPath)
      if (stat.isFile()) {
        if (/(.*)\.(js$|coffee$)/.test(file)) {
          return require(newPath)(app)
        }
      } else {
        if (stat.isDirectory() && file !== "middlewares") {
          return walkRoutes(newPath)
        }
      }
    })
  }
  walkRoutes(routesPath)
  app.use((err, req, res, next) => {
    if (err.message && (~err.message.indexOf("not found") || (~err.message.indexOf("Cast to ObjectId failed")))) {
      return next()
    }
    console.error(err.stack)
    return res.status(500).json({error: err.stack})
  })
  app.use(function(req, res) {
    return res.status(404).json({url: req.originalUrl, error: "Not found"})
  })
}