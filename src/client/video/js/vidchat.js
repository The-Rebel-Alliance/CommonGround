

// $('body').addClass('v') use some version of this to add different class to site.css

var videoClient;
var activeRoom; 
var previewMedia;
var identity;
var roomName = location.href.substr(location.href.lastIndexOf('/') + 1);
var url = location.href.substr(0, location.href.indexOf(location.pathname))
var path = location.pathname[1]
var counter = 0


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

console.log('path', path)


if (path === "s") {
  $('body *').addClass("s")
}

$("#controls.s").append(

  "<div id='votingContainer'>\
    <div id='upvote1'>\
      <button type='button' onclick='counter1()'>\
        <i id='interaction-agree2' class='fa fa-thumbs-up interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div>\
    <div id='upCounter1'>\
      <p id='counter1'></p>\
    </div>\
    <div id='downvote1'>\
      <button type='button' onclick='counter2()'>\
        <i id='interaction-disagree2' class='fa fa-thumbs-down interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div> \
      <div id='downCounter1'>\
        <p id='counter2'></p>\
      </div>\
    <div id='upvote2'>\
      <button type='button' onclick='counter3()'>\
        <i id='interaction-agree2' class='fa fa-thumbs-up interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div>\
      <div id='upCounter2'>\
        <p id='counter3'></p>\
      </div>      \
    <div id='downvote2'>\
      <button type='button' onclick='counter4()'>\
        <i id='interaction-disagree2' class='fa fa-thumbs-down interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div>\
      <div id='downCounter2'>\
        <p id='clicks4'></p>\
      </div>\
  </div>")

var clicks = 0; //This is for the UpVote/Downvote Counters
var clicks2 = 0;
var clicks3 = 0;
var clicks4 = 0;

function counter1() {
  clicks += 1;
  console.log(clicks)
$('#counter1').add('#counter1')
}
function counter2() {
  clicks2 += 1;
  console.log(clicks2)
 $('#counter2')
}
function counter3() {
  clicks3 += 1;
  console.log(clicks3)
 $('#counter3')
}
function counter4() {
  clicks4 += 1;
  console.log(clicks4)
 $('#counter4')
}


$.getJSON('/token/' + path, function (data) {
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
    var value = $("#message").val()
    socket.emit('vid message', {
      user: identity,
      message: $("#message").val()
    })
    $("#message").val("");
  })


  // $("#interactions-div > i").click(function(e) {
  //   var value = ""
  //   switch(e.toElement.id) {
  //     case "interaction-agree":
  //       value="<i class='fa fa-thumbs-up interaction-icons' aria-hidden='true'></i>"
  //       break;
  //     case "interaction-disagree":
  //       value="<i class='fa fa-thumbs-down interaction-icons' aria-hidden='true'></i>"
  //       break;
  //     case "interaction-question":
  //       value="<i class='fa fa-question-circle interaction-icons' aria-hidden='true'></i>"
  //       break;
  //     case "interaction-strike":
  //       value="<i id='interaction-strike' class='fa fa-times-circle interaction-icons' aria-hidden='true'></i>"
  //       break;
  //     default:
  //       value=""
  //   }

});

// Successfully connected!
function roomJoined(room) {
  activeRoom = room;
  // room.prototype.path = path
  room.path = path
  console.log('room', room)

  // log("Joined as '" + identity + "'");
  // document.getElementById('button-leave').style.display = 'inline';

  // Draw local video, if not already previewing
  if (room.path === "v") {
    // console.log('room.participants', room.participants.length())
    room.localParticipant.media.attach('#local-media'); //attaches screen of participant A
  }  
    
  room.participants.forEach(function(participant) { //attaches screen of participant A to participant B
    var participantIdentity = participant.identity.substring(0,1)
    if(participantIdentity === "v") {
      participant.media.attach('#remote-media');
      adjustVideo()
      console.log('participantIdentity', participantIdentity)  
    }
  });

  
  room.on('participantConnected', function (participant) { // attaches screen of participant B to participant A
    var participantIdentity = participant.identity.substring(0,1)
    if(participantIdentity === "v") {
      participant.media.attach('#remote-media');
      adjustVideo()
      console.log('participantIdentity', participantIdentity)  
    }
  });

  // When a participant disconnects, note in log
  room.on('participantDisconnected', function (participant) {
    var participantIdentity = participant.identity.substring(0,1)
    if(participantIdentity === "v"){
      participant.media.detach();
      adjustBackVideo()  
    }
  });
}


function leaveRoomIfJoined() {
  if (activeRoom) {
    activeRoom.disconnect();
  }
}

function adjustVideo() {
  $("#local-media").animate({
      bottom: '-=35%',
      height: "-=350px",
    }, 3000)
  $("#waiting-overlay").css({display:"none"})
}

function adjustBackVideo() {
  $("#local-media").animate({
      bottom: '+=35%',
      height: "+=350px"
      // marginTop: '+=38%',
      // height: '-=338px'
      // top: 0
    }, 3000)
  $("#waiting-overlay").css({display:"block"})

}

// function adjustVideo() {
//   $("#local-media").addClass("bottom")
//   $("#waiting-overlay").css({display:"none"})
// }


// function addToChat(userName, message) {
//   message = $("input").val()
//   console.log(message) 
// }

function updateMessaging(user, value) {
    $("#chat-window").append(`<div class=${identity===user ? 'chat-window-row-left' : 'chat-window-row-right'}><li class= ${identity===user ? 'user-style' : 'other-style'}>${user}: ${value}</li></div>`).scrollTop($("#chat-window")[0].scrollHeight);
}


// $("#chat-window").append(`<div class=${identity===user ? 'user-style':'other-style'} chat-window-row>${user}: <li class=chat-window-item>${value}</li>`).scrollTop($("#chat-window")[0].scrollHeight);

//jason twillio account config profile SID: VS9025d31d6b05358898fa6617bcc7cfc5
//jason twillio primary account SID: AC9835cee05e5e5f37ee066ccd9554cf83
//jason twillio account api key: SK538602cffe692e73127b5fc1626b4a2a
//jason twillio account api secret: N4VFpdTYtfl5QiYbDxQH0Wzecyh8WEXA
