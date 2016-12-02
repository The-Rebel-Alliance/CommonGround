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
  const token = req.get('token')

  const tokenSql = `
    select usernames.* from (
      select u.username, u.id, p.first_name, p.last_name, p.avatar, p.political_affiliation
        from users u 
        join profiles p on p.user_id = u.id
        join messages mf on mf.from_profile_id = p.id
        join messages mt on mt.to_profile_id = p.id
        where 
          mf.from_profile_id = (select p.id from users u
              join profiles p ON u.id = p.user_id
              join tokens t ON t.user_id = u.id
              where t.token = ?) or
          mf.to_profile_id = (select p.id from users u
              join profiles p ON u.id = p.user_id
              join tokens t ON t.user_id = u.id
              where t.token = ?) or
          mt.from_profile_id = (select p.id from users u
              join profiles p ON u.id = p.user_id
              join tokens t ON t.user_id = u.id
              where t.token = ?) or
          mt.to_profile_id = (select p.id from users u
              join profiles p ON u.id = p.user_id
              join tokens t ON t.user_id = u.id
              where t.token = ?)
        group by u.id
      ) as usernames
      join users on users.id = usernames.id
      left join tokens on tokens.user_id = users.id
      where tokens.token != ? or ISNULL(tokens.token)
  `

  conn.query(tokenSql, [token, token, token, token, token])
})

// router.get('/messages/:fromId', function(req, res, next){

// })

// router.post('/message', function(req, res, next){
//   const token = req.cookies['token']
// })

export default router
