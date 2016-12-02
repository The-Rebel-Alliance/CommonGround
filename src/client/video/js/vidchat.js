// const roomname = location.href.substr(location.href.lastIndexOf('/') + 1)
// console.log(roomname)

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
  // document.getElementById('room-controls').style.display = 'block';
  // document.getElementById('user1').innerHTML = identity

  // Bind button to join room
    if (roomName) {
      // log("Waiting for ");
       
      videoClient.connect({ to: roomName}).then(roomJoined) /*,
        function(error) {
          log('Could not connect to Twilio: ' + error.message);
        });*/
    }

  // Bind button to leave room
  document.getElementById('button-leave').onclick = function () {
    // log('Leaving room...');
    activeRoom.disconnect();
  };
});

// Successfully connected!
function roomJoined(room) {
  activeRoom = room;
  console.log('room.participants', room.participants)

  // log("Joined as '" + identity + "'");
  document.getElementById('button-join').style.display = 'none';
  document.getElementById('button-leave').style.display = 'inline';

  // Draw local video, if not already previewing
  if (!previewMedia) {
    room.localParticipant.media.attach('#local-media');
  }

  room.participants.forEach(function(participant) {
    // log("Already in Room: '" + participant.identity + "'");
    participant.media.attach('#remote-media');
    console.log('participant', participant)
  });

  // When a participant joins, draw their video on screen
  room.on('participantConnected', function (participant) {
    // log("Joining: '" + participant.identity + "'");
    participant.media.attach('#remote-media');
    // $(document).ready(function() { 
    //   $("button").click(function() {
        $("#local-media").animate({
          right:'5%',
          marginTop: '35%',
          height: '20%'
          // position: 'absolute'
        })
    //   })
    // })
  });

  // When a participant disconnects, note in log
  room.on('participantDisconnected', function (participant) {
    // log("Participant '" + participant.identity + "' left the room");
    participant.media.detach();
  });

  // When we are disconnected, stop capturing local video
  // Also remove media for all remote participants
  room.on('disconnected', function () {
    // log('Left');
    room.localParticipant.media.detach();
    room.participants.forEach(function(participant) {
      participant.media.detach();
    });
    activeRoom = null;
    document.getElementById('button-join').style.display = 'none';
    document.getElementById('button-leave').style.display = 'none';
  });
}

//  Local video preview
// document.getElementById('button-preview').onclick = function () {
//   if (!previewMedia) {
//     previewMedia = new Twilio.Video.LocalMedia();
//     Twilio.Video.getUserMedia().then(
//     function (mediaStream) {
//       previewMedia.addStream(mediaStream);
//       previewMedia.attach('#local-media');
//     },
//     function (error) {
//       console.error('Unable to access local media', error);
//       log('Unable to access Camera and Microphone');
//     });
//   };
// };

// Activity log
// function log(message) {
//   var logDiv = document.getElementById('log');
//   logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
//   logDiv.scrollTop = logDiv.scrollHeight;
// }

function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}
