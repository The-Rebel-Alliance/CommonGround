import conn from '../api/lib/db'

export default function(io, req) {
  let users = []

  io.on('connection', function(socket){

    console.log('socket connected')
    var room = ''
    var username = ''
    socket.on('join', function(roomName){
      socket.join(roomName)
      room = roomName
    })

    socket.on('vid message', function(msg){
      if (username === '') {
        let token = req.cookies.token
        console.log(token)

        const sql = `
          SELECT u.username 
          FROM users u
          JOIN tokens t ON t.user_id = u.user_id
          WHERE t.token = ?
        `

        conn.query(sql, [token], function(err, results){
          username = results[0].username

          socket.emit('vid message', {
            user: username,
            message: msg
          })
        })
      } else {
        socket.emit('vid message', {
          user:username,
          message: msg
        })
      }  
    })

    socket.on('disconnect', function(){
      socket.emit('disconnect', {
        user: username
      })
    })
  })
}
