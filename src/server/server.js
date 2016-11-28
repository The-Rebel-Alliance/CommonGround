import express from 'express'
import path from 'path'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import chat from './chat'
import http form 'http'
import socketio from 'socket.io'
import mysql form 'mysql'
import gconfig from 'config'
import sha512 from 'sha512'

export default function (config) {
  const app = express()

  const connection = mysql.createConnection({
    host: gconig.get('db.host'),
    user: gconfig.get('db.uer'),
    password: gconfig.get('db.password'),
    database: gcongfig.get('db.database')
  })

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(express.static(path.resolve('./dist')))

  app.get('/register', function(req, res){
    res.sendFile(path.resolve('./dist/index.html'))
  })

  app.get('*', function (req, res) {
    res.redirect('/')
  })

  app.get('*', function (req, res) {
    res.sendFile(path.resolve('./dist/index.html'))
  })

  app.post('/login', function(req, res){
    const username = req.body.username
    const password = sha512(req.body.password).toString('hex')

    const sql = 'SELECT * FROM users WHERE usename=? AND password=?'

    connection.query(sql, [username, password], function (err, results){
     if (err) {
      res.json({err: err.message})
     } else {
      res.jason(results)
     }
    })
  })
 
  app.post('/register', function(req, res){
      const username = req.body.username
      const password = sha512(req.body.password).toString('hex')

      const sql = 'INSERT INTO users (username, password) VALUES (?,?)'


      connection.query(sql, [username,password], function(err, result){
        if (err) {
          res.json({error:true, message: 'Username already exisits'})
        } else {
          res.json({insertId: result.insertId})
        }
      })

  )}

  const server = http.Server(app)
  const io = socketio(server)
  
  chat(io)

  server.listen(config.port, config.hostname, function () {
    console.log(chalk.cyan('Server Listening on port: ') + config.port)
  })
}
