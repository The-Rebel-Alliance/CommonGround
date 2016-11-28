export defautl function(io) {
  io.on('connection', function(socket){
    socket.on('new massage', function(msg){
      io.emit('new message', msg)
    })
  })
}
