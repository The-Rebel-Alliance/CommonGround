import conn from '../api/lib/db'

export default function (mes) {
  var users = []
  mes.on('connection', function(socket){
    socket.on('join', function(token){
      var sql = `
        SELECT u.id
        FROM users u
        JOIN tokens t ON t.user_id = u.id
        WHERE token = ?
      `

      conn.query(sql, [token], function(err, results){
        var userId = results[0].id

        socket.userId = userId

        users.push({
          userId: userId,
          socketId: socket.id
        })
      })
    })

    socket.on('new message', function(toId){
      var user = users.filter(user => user.userId == toId)[0]
      if (user) {
        socket.to(user.socketId).emit('new message', socket.userId)
      }
    })

    socket.on('disconnect', function(){
      users = users.filter(user => user.socketId !== socket.id)
    })
  })
}
