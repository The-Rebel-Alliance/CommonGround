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

router.get('/topics', function(req, res){
  const sql = 'SELECT * FROM topics'

  connection.query(sql, function(err, results){
    const topics = results.map(topic => topic.name)
    res.json(topics)
  })
})

export default router
