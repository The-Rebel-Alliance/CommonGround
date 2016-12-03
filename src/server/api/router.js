import express from 'express'
import mysql from 'mysql'
import config from 'config'
import sha512 from 'sha512'
import conn from './lib/db'

const router = express.Router()

router.get('/search/:topicId?', function(req, res, next){
  let topicId = req.params.topicId
  const token = req.get('token')
  
  if (!topicId) {
    res.err = true
    res.data = []
    res.message = 'No topic provided'
    next()
  } else {
    let sql = `SELECT u.id, u.username, p.avatar, p.first_name, p.last_name, p.city, p.state, p.political_affiliation
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

router.get('/messages', function(req, res, next){
  const token = req.token
  
  const sql = `
    SELECT fp.id, fu.username, fp.first_name, fp.last_name, fp.city, fp.state, fp.avatar, fp.political_affiliation
    FROM messages m
    JOIN profiles tp ON tp.id = m.to_profile_id
    JOIN profiles fp ON fp.id = m.from_profile_id
    JOIN users fu ON fu.id = fp.user_id
    JOIN users tu ON tu.id = tp.user_id
    JOIN tokens tt ON tt.user_id = tu.id
    WHERE tt.token = ?
    GROUP BY m.from_profile_id;
  `

  conn.query(sql, [token], function(err, results){
    res.err = false
    res.data = results
    res.message = ''
    next()
  })
})

router.get('/messages/:fromId', function(req, res, next){
  const token = req.token
  const fromId = req.params.fromId

  const sql = `
    SELECT
    IF(tt.token = ?, 'them', 'you') as \`from\`, fu.username, m.message, m.created_at
    FROM messages m
    JOIN profiles tp ON tp.id = m.to_profile_id
    JOIN profiles fp ON fp.id = m.from_profile_id
    JOIN users fu ON fu.id = fp.user_id
    JOIN users tu ON tu.id = tp.user_id
    LEFT JOIN tokens ft ON ft.user_id = fu.id
    LEFT JOIN tokens tt ON tt.user_id = tu.id
    WHERE (tt.token = ? AND fu.id = ?) OR (ft.token = ? AND tu.id = ?)
    ORDER BY m.created_at
  `

  conn.query(sql, [token, token, fromId, token, fromId], function(err, results){
    res.err = false
    res.data = results
    res.message = ''
    next()  
  })
})

router.post('/message', function(req, res, next){
  const token = req.get('token')
})

router.get('/profile', function(req, res, next){
  const token = req.get('token')

  const sql = `
    SELECT u.username, p.first_name, p.last_name, p.city, p.state, p.avatar, p.political_affiliation
    FROM users u
    JOIN profiles p ON p.user_id = u.id
    JOIN tokens t ON t.user_id = u.id
    WHERE t.token = ?
  `

  conn.query(sql, [token], function(req, res, next){
    res.err = false
    res.data = results
    res.message = ''
    next()
  })
})

router.get('/profile/:id', function(req, res, next){
  const sql = `
    SELECT u.username, p.first_name, p.last_name, p.city, p.state, p.avatar, p.political_affiliation
    FROM users u
    JOIN profiles p ON p.user_id = u.id
    JOIN tokens t ON t.user_id = u.id
    WHERE u.id = ?
  `

  conn.query(sql, [token], function(req, res, next){
    res.err = false
    res.data = results
    res.message = ''
    next()
  })
})

export default router
