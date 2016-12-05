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

  if (!username || !password) {
    res.status(401).send({
      message: 'Invalid username or password'
    })
  } else {
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
  }
})

router.get('/topics', function(req, res){
  const sql = 'SELECT * FROM topics'

  conn.query(sql, function(err, results){
    console.log(results)
    const topics = results.map(topic => ({id:topic.id, name:topic.name}))
    res.json(topics)
  })
})

router.post('/register', function(req, res, next){
  const username = req.body.username
  const password = sha512(req.body.password + config.get('salt')).toString('hex')
  const firstName = req.body.firstName || ''
  const lastName = req.body.lastName || ''
  const city = req.body.city || ''
  const state = req.body.state || ''
  const avatar = req.body.avatar || ''
  const politicalAff = req.body.politicalAffiliation || ''
  const topics = req.body.topics || []

  const userSql = 'INSERT INTO users (username, password) VALUES (?, ?)'

  conn.query(userSql, [username, password], function(err, results){
    if (err) {
      res.status(403).send({
        message: 'Username already exists'
      })
    } else {
      const insertId = results.insertId

      const profileSql = `INSERT INTO profiles (first_name, last_name, city, state, political_affiliation, avatar, user_id)
                          VALUES (?, ?, ?, ?, ?, ?, ?)`

      conn.query(profileSql, [firstName, lastName, city, state, politicalAff, avatar, insertId], function(err, presults){
        if (err) {
          console.log(err)
          res.status(500).send({
            message: 'Oops! We did something wrong...Our bad!'
          })
        } else {
          if (topics.length > 0) {
            let insertArr = []
            let topicSql = 'INSERT INTO user_topics_link (topic_id, profile_id) VALUES '
            topics.forEach(function(topicId){
              topicSql += '(?, ?),'
              insertArr.push(topicId)
              insertArr.push(presults.insertId)
            })
            topicSql = topicSql.slice(0, -1)

            conn.query(topicSql, insertArr, function(err, tresults){
              res.error = false
              res.data = {userId: insertId}
              res.message = 'User Registered Successfully'
              next()
            })
          } else {
            res.error = false
            res.data = {userId: insertId}
            res.message = 'User Registered Successfully'
            next()
          }
        }
      })
    }
  })
})

export default router
