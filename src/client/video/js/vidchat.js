

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
    $("#local-media").animate({
      right:'5%',
      marginTop: '35%',
      height: '20%',
      position: 'absolute'
    }, 3000)
    console.log('participant', participant)
  });

  // When a participant joins, draw their video on screen
  room.on('participantConnected', function (participant) {
    participant.media.attach('#remote-media');
    $("#local-media").animate({
      right:'5%',
      marginTop: '35%',
      height: '20%',
      position: 'absolute'
    }, 3000)
  });

  // When a participant disconnects, note in log
  room.on('participantDisconnected', function (participant) {
    participant.media.detach();
  });

  // When we are disconnected, stop capturing local video
  // Also remove media for all remote participants
  room.on('disconnected', function () {
    room.localParticipant.media.detach();
    room.participants.forEach(function(participant) {
      participant.media.detach();
    });
    activeRoom = null;
    // document.getElementById('button-leave').style.display = 'none';
  });
}

function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}
