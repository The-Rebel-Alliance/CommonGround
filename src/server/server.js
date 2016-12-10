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
import { AccessToken } from 'twilio'
import conn from './api/lib/db'
import socketio from 'socket.io'
import videoChat from './video/chat'
const VideoGrant = AccessToken.VideoGrant

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
    res.redirect('https://'+req.hostname+':' + config.get('server.https.port') + req.url);
  })

  app.get('/v/:roomname', function(req, res, next){
    res.sendFile(path.resolve(conf.root + '/v/index.html'))
  })

  app.get('/s/:roomname', function(req, res, next){
    res.sendFile(path.resolve(conf.root + '/v/index.html'))
    console.log('test')
  })

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(express.static(path.resolve(conf.root)))

  app.get('/token', function(req, res) {
    const token = req.cookies['token'].trim()
    const sql = 'SELECT u.username FROM users u JOIN tokens t on t.user_id = u.id WHERE t.token=?'

    conn.query(sql, [token], function(err, response){
      const identity = response[0].username
      // Create an access token which we will sign and return to the client,
      // containing the grant we just created
      const token = new AccessToken(
        config.get('twilio.ACCOUNT_SID'),
        config.get('twilio.API_KEY'),
        config.get('twilio.API_SECRET')
      )

      // Assign the generated identity to the token
      token.identity = identity

      //grant the access token Twilio Video capabilities
      let grant = new VideoGrant()
      grant.configurationProfileSid = config.get('twilio.CONFIGURATION_SID')
      token.addGrant(grant)

      // Serialize the token to a JWT string and include it in a JSON response
      res.json({
        identity: identity,
        token: token.toJwt()
      })
    })
  })

  // API Routes
  app.use('/api', authenticate, apiRouter)
  app.use(upsertUser)
  app.use(formatResponse)

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(conf.root + '/index.html'))
  })

  const httpServer = http.createServer(app)
  const httpsServer = https.createServer(httpsConfig, app)

  const io = socketio(httpsServer)
  const video = io.of('/video')

  videoChat(video)

  httpServer.listen(config.get('server.http.port'), conf.hostname)
  httpsServer.listen(config.get('server.https.port'), conf.hostname)
}
