export default function(vid) {
  var rooms = []

  vid.on('connection', function(socket){
    var room = ''
    var particpants = []
    var spectators = []

    socket.on('particpant connect', function(user){
      participants.push({
        username:user, 
        id:socket.id
      })
    })

    socket.on('spectator connect', function(){
      spectators.push(socket.id)
      socket.emit('spec count', spectators.length)
    })

    socket.on('join', function(roomName){
      socket.join(roomName)
      room =  roomName
    })

    socket.on('vid message', function(msg){
      vid.to(room).emit('vid message', msg)
    })

    socket.on('spec vote', function(vote){
      vid.to(room).emit('spec vote', vote)
    })

    socket.on('disconnect', function(){
      spectators = spectators.filter(function(id){
        return id !== socket.id
      })
      socket.emit('spec count', spectators.length)

      particpants = particpants.filter(function(user){
        return user.id !== socket.id
      })

      if (participants.length < 2) {
        // change array of rooms
      }
    })

  })
}
