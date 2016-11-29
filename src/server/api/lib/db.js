import mysql from 'mysql'
import config from 'config'

export default mysql.createConnection({
  host: config.get('db.hostname'),
  user: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.database')
})
