import conn from './db'

export function formatResponse(req, res, next) {
  // res.json({
  //   error: res.error,
  //   data: res.data,
  //   message: res.message
  // });
  res.json(res.data)
}

export function authenticate(req, res, next) {
  let token = req.body.token || req.params.token || req.get('Authorization')

  if (token) {
    if (/^Authorization /.test(token)) {
      token = token.substr(14)
    }
    conn.query('SELECT user_id FROM tokens WHERE token=?', [token], function(err, results){
      if (results.length > 0) {
        req.token = token
        next()
      } else {
        res.status(401).send({
          message: 'Invalid token'
        })
      }
    })
  } else {
    return res.status(403).send({
      message: 'No token provided'
    })
  }
}
