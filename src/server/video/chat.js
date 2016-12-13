export default function(vid) {
  var rooms = []
  var parts = []
  var specs = []

  vid.on('connection', function(socket){
    var room = ''

    socket.on('join', function(roomName){
      socket.join(roomName)
      room =  roomName
    })

    socket.on('participant connect', function(user){
      parts.push({
        username:user, 
        id:socket.id
      })
    })

    socket.on('spectator connect', function(){
      specs.push(socket.id)
      vid.to(room).emit('spec count', specs.length)
    })

    socket.on('vid message', function(msg){
      vid.to(room).emit('vid message', msg)
    })

    socket.on('spec vote', function(vote){
      vid.to(room).emit('spec vote', vote)
    })

    socket.on('disconnect', function(){
      specs = specs.filter(function(id){
        return id !== socket.id
      })
      vid.to(room).emit('spec count', specs.length)

      parts = parts.filter(function(user){
        return user.id !== socket.id
      })

      if (parts.length < 2) {
        // change array of rooms
      }
    })

  })
}
