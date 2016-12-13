

// $('body').addClass('v') use some version of this to add different class to site.css

var videoClient;
var activeRoom; 
var previewMedia;
var identity;
var roomName = location.href.substr(location.href.lastIndexOf('/') + 1);
var url = location.href.substr(0, location.href.indexOf(location.pathname))
var path = location.pathname[1]
var spectatorCounter = 0

// Check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  alert('WebRTC is not available in your browser.');
}

// When we are about to transition away from this page, disconnect
// from the room, if joined.
// window.addEventListener('beforeunload', leaveRoomIfJoined);

// console.log('path', path)

if (path === "s") {
  $('body *').addClass("s")
  //JASON: YOU NEED TO FIGURE OUT JQUERY CODE TO ADD HTML BASED ON PATH === 'S'
}

var socket = io('/video').connect(url, {
  secure:true
})

socket.emit('join', roomName)

$.getJSON('/token/' + path, function (data) {
  identity = data.identity;

  socket.on('spec count', function(count) {
    // $("#spectators-counter").html(count)
    console.log('socket.on spec count:', count)
  })

  socket.on('vid message', function(msg) {
    updateMessaging(msg.user, msg.message)
  })

  socket.on('spec count', function(count) {
    $("#spectators-counter").html(count)
  })

  socket.on('participant connect', function(user, i) {
    console.log('participant connect')
    console.log($("#user-identity").html())
    // if($(`#user${i}-identity`).html() === "Waiting for user...") {
    //   console.log('i', i)
    //   $(`#user${i}-identity1`).html(user.username)  
    // }
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

  // log("Joined as '" + identity + "'");
  // document.getElementById('button-leave').style.display = 'inline';

  // Draw local video, if not already previewing
  if (room.path === "v") {
    room.localParticipant.media.attach('#local-media'); //attaches screen of participant A
    socket.emit('participant connect', identity)
  } else {
    socket.emit('spectator connect')
  }
    
  room.participants.forEach(function(participant) { //attaches screen of participant A to participant B
    var participantIdentity = participant.identity.substring(0,1)
    if(participantIdentity === "v") {
      participant.media.attach('#remote-media');
      adjustVideo()
    }  
  });

 // $(`#user${i}-identity`).html(participantName)
  
  room.on('participantConnected', function (participant) { // attaches screen of participant B to participant A
    var participantIdentity = participant.identity.substring(0,1)
    if(participantIdentity === "v") {
      participant.media.attach('#remote-media');
      adjustVideo() 
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

//else {
    //   spectatorCounter++
    //   console.log('spectatorCounter after counter function: ', spectatorCounter)
    //   socket.emit('spec count', spectatorCounter)
    // }
