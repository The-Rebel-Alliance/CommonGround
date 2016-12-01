import express from 'express'
import mysql from 'mysql'
import config from 'config'
import sha512 from 'sha512'

const router = express.Router()

const connection = mysql.createConnection({
  host: config.get('db.hostname'),
  user: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.database')
})

router.get('/search/:topicId?', function(req, res, next){
  let topicId = req.params.topicId
  const token = req.cookies['token']
  if (!topicId) {
    res.err = true
    res.data = []
    res.message = 'No topic provided'
    next()
  } else {
    let sql = `SELECT u.username, p.avatar, p.first_name, p.last_name, p.city, p.state, p.political_affiliation
               FROM users u
               JOIN profiles p ON u.id = p.user_id
               JOIN user_topics_link utl ON p.id = utl.profile_id
               JOIN topics t ON utl.topic_id = t.id
               LEFT JOIN tokens ON u.id = tokens.user_id
               WHERE t.id = ? 
               AND (tokens.token != ? OR ISNULL(tokens.token))`

    conn.query(sql, [topicId, token], function(err, results){
      res.err = false
      res.data = results
      res.message = ''
      next()
    })
  }
})

// router.get('/profiles', function(req, res){
//   const getProfile ='SELECT * FROM profiles'

//   connection.query(getProfile, function(err, profiles){
//       res.json(profiles)   
//   })
// })

// router.get('/messages', function(req, res){
//   const getMessages = 'SELECT * FROM messages'

//   connection.query(getMessages, function(err, messages){
//       res.json(messages)
//   })
// })

// router.get('/tokens', function(req, res){
//   const getTokens = 'SELECT * FROM tokens'

//   connection.query(getTokens, function(err, tokens){
//       res.json(tokens)
//   })
// })

// router.get('/video_links', function(req, res, next){
//   const getVideo = 'SELECT * FROM video_links'

//   connection.query(getVideo, function(err, results){
//     const video_links = results.map(video_link => video_link.room_name)
//       res.error = false
//       res.data = video_links
//       res.message = ''
//       next()
//   })
// })

// router.get('/users', function(req, res, next){
//   const getUsers = 'SELECT * FROM users'

//   connection.query(getUsers, function(err, results){
//     const users = results.map(user => user.username)
//       res.data = users
//       res.error = false
//       res.message = ''
//       next()
//   })
// })


export default router

















