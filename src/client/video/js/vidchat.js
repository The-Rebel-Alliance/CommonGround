

var videoClient;
var activeRoom;
var previewMedia;
var identity;
var roomName = location.href.substr(location.href.lastIndexOf('/') + 1);
var url = location.href.substr(0, location.href.indexOf(location.pathname))
var user = "test"

var socket = io('/video').connect(url, {
  secure:true
})
// Check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  alert('WebRTC is not available in your browser.');
}

// When we are about to transition away from this page, disconnect
// from the room, if joined.
window.addEventListener('beforeunload', leaveRoomIfJoined);


$.getJSON('/token', function (data) {
  identity = data.identity;

  socket.emit('join', roomName)
  socket.on('vid message', function(msg) {
    updateMessaging(msg.user, msg.message)
  })

  // Create a Video Client and connect to Twilio
  videoClient = new Twilio.Video.Client(data.token);
 
  // Bind button to join room
  if (roomName) {
    videoClient.connect({ to: roomName}).then(roomJoined) 
  }

  // Bind button to leave room
  // document.getElementById('button-leave').onclick = function () {
  //   // log('Leaving room...');
  //   activeRoom.disconnect();
  // };

  $("form").submit(function(e) {
    e.preventDefault()
    var user = 'test'
    var value = $("#message").val()
    socket.emit('vid message', {
      user: identity,
      message: $("#message").val()
    })
    $("#message").val("");
  })


  $("#interactions-div > i").click(function(e) {
    var value = ""
    switch(e.toElement.id) {
      case "interaction-agree":
        value="<i class='fa fa-thumbs-up interaction-icons' aria-hidden='true'></i>"
        break;
      case "interaction-disagree":
        value="<i class='fa fa-thumbs-down interaction-icons' aria-hidden='true'></i>"
        break;
      case "interaction-question":
        value="<i class='fa fa-question-circle interaction-icons' aria-hidden='true'></i>"
        break;
      case "interaction-strike":
        value="<i id='interaction-strike' class='fa fa-times-circle interaction-icons' aria-hidden='true'></i>"
        break;
      default:
        value=""
    }
    socket.emit('vid message', {
      user: identity,
      message: value
    })
  })
});

// Successfully connected!
function roomJoined(room) {
  activeRoom = room;

  // log("Joined as '" + identity + "'");
  // document.getElementById('button-leave').style.display = 'inline';

  // Draw local video, if not already previewing
  if (!previewMedia) {
    room.localParticipant.media.attach('#local-media');
  }

  room.participants.forEach(function(participant) {
    participant.media.attach('#remote-media');
    adjustVideo()
  });

  // When a participant joins, draw their video on screen
  room.on('participantConnected', function (participant) {
    participant.media.attach('#remote-media');
    adjustVideo()
  });

  // When a participant disconnects, note in log
  room.on('participantDisconnected', function (participant) {
    participant.media.detach();
    adjustBackVideo()
  });
}

function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}

function adjustVideo() {
  $("#local-media").animate({
      left:'+=68%',
      marginTop: '+=51%',
      height: '-=40%'
    }, 3000)
  $("#waiting-overlay").css({display:"none"})
}

function adjustBackVideo() {
  $("#local-media").animate({
      left:'-=68%',
      marginTop: '-=51%',
      height: '+=40%'
    }, 3000)
  $("#waiting-overlay").css({display:"block"})

}

// function addToChat(userName, message) {
//   message = $("input").val()
//   console.log(message) 
// }

function updateMessaging(user, value) {
    $("#chat-window").append(`<div class=chat-window-row>${user}: <li class=chat-window-item>${value}</li>`).scrollTop($("#chat-window")[0].scrollHeight);
}
