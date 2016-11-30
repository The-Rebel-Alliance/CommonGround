import express from 'express'
import path from 'path'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import apiRouter from './api/router'
import upsertUser from './api/upsertUser'
import {authenticate, formatResponse} from './api/lib/middleware'
import http from 'http'
import https from 'https'
import fs from 'fs'
import config from 'config'

export default function (conf) {
  const app = express()

  const httpsConfig = {
    key: fs.readFileSync('file.pem'),
    cert: fs.readFileSync('file.crt')
  }

  app.all('*', function(req, res, next){
    if(req.secure){
      return next()
    }
    res.redirect('https://'+req.host+':' + config.get('server.https.port') + req.url);
  })

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(express.static(path.resolve(conf.root)))

  // API Routes
  app.use('/api', authenticate, apiRouter)
  app.use(upsertUser)
  app.use(formatResponse)

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(conf.root + '/index.html'))
  })

  http.createServer(app).listen(config.get('server.http.port'), conf.hostname)
  https.createServer(httpsConfig, app).listen(config.get('server.https.port'), conf.hostname)
}
