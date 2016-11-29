import express from 'express'
import sha512 from 'sha512'
import config from 'config'
import conn from './lib/db'
import uuid from 'uuid'

const router = express.Router()

router.post('/login', function(req, res, next){
  const username = req.body.username
  const password = sha512(req.body.password + config.get('salt')).toString('hex')
  const sql = 'SELECT * FROM users WHERE username=? AND password=?'

  conn.query(sql, [username, password], function(err, results){
    if (results.length > 0) {
      const token = uuid()
      const userId = results[0].id

      const upsertSql = `INSERT INTO tokens (user_id, token) VALUES (?, ?) 
                          ON DUPLICATE KEY UPDATE token=?`

      conn.query(upsertSql, [userId, token, token], function(err, results){
        if (err) {
          console.log(err)
          res.status(500).send({
            message: 'Oops! We did something wrong...Our bad!'
          })
        } else {
          res.error = false
          res.data = {'token':token}
          res.message = 'Authorization Token'
          next()
        }
      })
    } else {
      res.status(401).send({
        message: 'Invalid username or password'
      })
    }
  })
})

router.post('/register', function(req, res, next){
  const username = req.body.username
  const password = sha512(req.body.password + config.get('salt')).toString('hex')
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const city = req.body.city
  const state = req.body.state
  const avatar = req.body.avatar
  const userSql = 'INSERT INTO users (username, password) VALUES (?, ?)'

  conn.query(userSql, [username, password], function(err, results){
    if (err) {
      res.status(403).send({
        message: 'Username already exists'
      })
    } else {
      const insertId = results.insertId
      const profileSql = `INSERT INTO profiles (first_name, last_name, city, state, avatar, user_id)
                          VALUES (?, ?, ?, ?, ?, ?)`

      conn.query(profileSql, [firstName, lastName, city, state, avatar, insertId], function(err, results){
        if (err) {
          console.log(err)
          res.status(500).send({
            message: 'Oops! We did something wrong...Our bad!'
          })
        } else {
          res.error = false
          res.data = {userId: insertId}
          res.message = 'User Registered Successfully'
          next()
        }
      })
    }
  })
})

export default router
