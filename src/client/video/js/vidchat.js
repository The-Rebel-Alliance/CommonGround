

// $('body').addClass('v') use some version of this to add different class to site.css

var videoClient;
var activeRoom; 
var previewMedia;
var identity;
var roomName = location.href.substr(location.href.lastIndexOf('/') + 1);
var url = location.href.substr(0, location.href.indexOf(location.pathname))
var path = location.pathname[1]
// var counter = 0
var counter = {
    user1up:0,
    user1down:0,
    user2up:0,
    user2down:0
}

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
      <button id='user1up' type='button' class='vote'>\
        <i id='interaction-agree2' class='fa fa-thumbs-up interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div>\
    <div id='upCounter1'>\
      <p class='user1up'>##</p>\
    </div>\
    <div id='downvote1'>\
      <button id='user1down' type='button' class='vote'>\
        <i id='interaction-disagree2' class='fa fa-thumbs-down interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div> \
      <div id='downCounter1'>\
        <p class='user1down'>##</p>\
      </div>\
    <div id='upvote2'>\
      <button id='user2up' type='button' class='vote'>\
        <i id='interaction-agree2' class='fa fa-thumbs-up interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div>\
      <div id='upCounter2'>\
        <p class='user2up'>##</p>\
      </div>      \
    <div id='downvote2'>\
      <button id='user2down' type='button' class='vote'>\
        <i id='interaction-disagree2' class='fa fa-thumbs-down interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div>\
      <div id='downCounter2'>\
        <p class='user2down'>##</p>\
      </div>\
  </div>")

$(".vote").on('click', function(e){
  
  var id = $(this).attr('id')

  counter[id] = counter[id] + 1

  socket.emit('spec vote', counter)
})

// var clicks = 0; //This is for the UpVote/Downvote Counters
// var clicks2 = 0;
// var clicks3 = 0;
// var clicks4 = 0;

// function counter1() {
//   clicks += 1;
//   var obj = {
//     count1: ,
//     count2: ,
//     count3: ,
//     count4: 
//   }
//   socket.emit("spec vote", clicks)
// }

// function counter2() {
//   clicks2 += 1;
//   socket.emit("spec vote", clicks2)
// }

/*function counter3() {
  clicks3 += 1;
 $('#counter3').html(clicks3);
}
function counter4() {
  clicks4 += 1;
 $('#counter4').html(clicks4);
}*/

//function for Socket.IO
// function updateVote1(value) {
//   $("#counter1").html(value);
// }

// function updateVote2(value) {
//   $("#counter2").html(value);
// }

/*
function updateVote3(value) {
  $("#counter3").html(value);
}

function updateVote4(value) {
  $("#counter4").html(value);
}*/

function seeCounter(obj) {
  counter = obj
  console.log(counter)
}

$.getJSON('/token/' + path, function (data) {
  identity = data.identity;

  socket.emit('join', roomName)
  socket.on('vid message', function(msg) {
    updateMessaging(msg.user, msg.message)
  })
//Sockets for ThumbUP/ThumbDown
  // socket.emit('spec vote', clicks)   
  socket.on('spec vote', function(counter){
    for(let key in counter) {
      counter[key] = counter[key]
      $('.' + key).html(counter[key])
    }
    console.log('counter after spec vote', counter)
    seeCounter(counter)
  })

  // socket.on('spec vote', function(vote){
  //   updateVote2(vote)
  // })

/*  socket.emit('spec vote', 'value')   
  socket.on('spec vote', function(vote){
    updateVote2(vote.value)
  })

  socket.emit('spec vote', 'value')   
  socket.on('spec vote', function(vote){
    updateVote3(vote.value)
  })

  socket.emit('spec vote', 'value')   
  socket.on('spec vote', function(vote){
    updateVote4(vote.value)
  })  */

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
    }, 1000)
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
