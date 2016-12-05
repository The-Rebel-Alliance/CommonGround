

var videoClient;
var activeRoom;
var previewMedia;
var identity;
var roomName = location.href.substr(location.href.lastIndexOf('/') + 1);

// Check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  alert('WebRTC is not available in your browser.');
}

// When we are about to transition away from this page, disconnect
// from the room, if joined.
window.addEventListener('beforeunload', leaveRoomIfJoined);

$(document).ready(function() {
  $("#test").click(function() {
    $("#interaction-response").css({display:"block"})
  })
})


$.getJSON('/token', function (data) {
  console.log('data', data)
  identity = data.identity;

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
});

// Successfully connected!
function roomJoined(room) {
  activeRoom = room;
  console.log('room.participants', room.participants)

  // log("Joined as '" + identity + "'");
  // document.getElementById('button-leave').style.display = 'inline';

  // Draw local video, if not already previewing
  if (!previewMedia) {
    room.localParticipant.media.attach('#local-media');
  }

  room.participants.forEach(function(participant) {
    participant.media.attach('#remote-media');
    adjustVideo()
    console.log('adjustVideo() not "room.on(participantConnected)")')
  });

  // When a participant joins, draw their video on screen
  room.on('participantConnected', function (participant) {
    participant.media.attach('#remote-media');
    adjustVideo()
    console.log('adjustVideo() room.on("participantConnected"')
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
