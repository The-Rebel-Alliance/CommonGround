import conn from '../lib/db'

export default function(vid) {
  var rooms = {}

  vid.on('connection', function(socket){
    var room = ''

    socket.on('join', function(roomName){
      socket.join(roomName)
      room = roomName
      if (!rooms[room]) {
        rooms[room] = {
          parts:[],
          specs:[]
        }
      }
      // if (rooms[room].parts.length > 1) {
      //   var sql = `
      //     SELECT first_name, last_name, avatar
      //     FROM profiles p
      //     JOIN users u ON p.user_id = u.id
      //     WHERE u.username = ?
      //     || u.username = ?
      //   `
      //   conn.query()
      //   vid.to('livetrack').emit({

      //   })
      // }
    })

    socket.on('participant connect', function(user){
      rooms[room].parts.push({
        username:user, 
        id:socket.id
      })
      vid.to(room).emit('participant connect', {
        username: user
      })
    })

    socket.on('spectator connect', function(){
      rooms[room].specs.push(socket.id)
      vid.to(room).emit('spec count', rooms[room].specs.length)
    })

    socket.on('vid message', function(msg){
      vid.to(room).emit('vid message', msg)
    })

    socket.on('spec vote', function(vote){
      vid.to(room).emit('spec vote', vote)
    })

    socket.on('disconnect', function(){
      console.log(rooms)
      if (rooms[room] && rooms[room].specs) {
        rooms[room].specs = rooms[room].specs.filter(function(id){
          return id !== socket.id
        })
        vid.to(room).emit('spec count', rooms[room].specs.length)  
      }
      
      if (rooms[room] && rooms[room].parts) {
        rooms[room].parts = rooms[room].parts.filter(function(user){
          return user.id !== socket.id
        })

        if (rooms[room].parts.length < 2) {
          
        }  
      }
    })

  })
}
