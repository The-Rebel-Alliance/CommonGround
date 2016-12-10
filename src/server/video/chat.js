export default function(vid) {
  vid.on('connection', function(socket){
    console.log('socket connected')
    var room = ''

    socket.on('join', function(roomName){
      socket.join(roomName)
      room = roomName
    })

    socket.on('vid message', function(msg){
      vid.to(room).emit('vid message', msg)
    })

    socket.on('spec vote', function(vote){
      vid.to(room).emit('spec vote', vote)
    })
  })
}
