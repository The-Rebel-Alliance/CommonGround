import express from 'express'
import path from 'path'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import apiRouter from './api/router'
import upsertUser from './api/upsertUser'
import {authenticate, formatResponse} from './lib/middleware'

export default function (config) {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(express.static(path.resolve('./dist')))

  // API Routes
  app.use('/api', authenticate, apiRouter)
  app.use(upsertUser)
  app.use(formatResponse)

  app.get('*', function (req, res) {
    res.sendFile(path.resolve('./dist/index.html'))
  })



  app.listen(config.port, config.hostname, function () {
    console.log(chalk.cyan('Server Listening on port: ') + config.port)
  })
}
