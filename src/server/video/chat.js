import conn from '../api/lib/db'

export default function(vid) {
  var rooms = {}
  var livetrackRooms = []

  vid.on('connection', function(socket){
    var room = ''

    socket.on('livetrack', function(){
      socket.join('livetrack')
    })

    socket.on('join', function(roomName){
      socket.join(roomName)
      room = roomName
      if (!rooms[room]) {
        rooms[room] = {
          parts:[],
          specs:[]
        }
      }
    })

    socket.on('participant connect', function(user){
      rooms[room].parts.push({
        username:user, 
        id:socket.id
      })
      vid.to(room).emit('participant connect', {
        users: rooms[room].parts.map(part => part.username)
      })
      if (rooms[room].parts.length === 2) {
        let sql = `
          SELECT first_name, last_name, avatar
          FROM profiles p
          JOIN users u ON p.user_id = u.id
          WHERE u.username = ?
          OR u.username = ?
        `
        let participants = rooms[room].parts.map(part => part.username)
        conn.query(sql, participants, function(err, results){
          console.log(results)
          if (err) {
            console.log(err)
          }
          livetrackRooms.push({
            link: '/s/' + room,
            user1: {
              first_name: results[0].first_name,
              last_name: results[0].last_name,
              avatar: results[0].avatar
            },
            user2: {
              first_name: results[1].first_name,
              last_name: results[1].last_name,
              avatar: results[1].avatar
            }
          })
          vid.to('livetrack').emit('new room', livetrackRooms)
        })
      }
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
          livetrackRooms = livetrackRooms.filter(function(livetrackroom){
            return livetrackroom.link.indexOf(room) === -1
          })
          vid.to('livetrack').emit('new room', livetrackRooms)
        }
      }
    })

  })
}
