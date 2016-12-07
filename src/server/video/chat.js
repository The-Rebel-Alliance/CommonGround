export default function(io) {
  io.on('connection', function(socket){
    var room = ''

    socket.on('join', function(roomName){
      socket.join(roomName)
      room = roomName
    })

    socket.on('vid message', function(msg){
      io.to(room).emit('vid message', msg)
    })
  })
}
