import conn from '../api/lib/db'

export default function(io, req) {
  let users = []

  io.on('connection', function(socket){

    console.log('socket connected')
    var room = ''

    socket.on('join', function(roomName){
      socket.join(roomName)
      room = roomName
    })

    socket.on('vid message', function(msg){
      socket.to(room).emit('vid message', {
        user: username,
        message: msg
      })
    })

    socket.on('disconnect', function(){
      socket.to(room).emit('disconnect', {
        user: username
      })
    })
  })
}
