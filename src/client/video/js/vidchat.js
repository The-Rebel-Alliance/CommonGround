

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

// Check for WebRTC
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
  alert('WebRTC is not available in your browser.');
}

if (path === "s") {
  $('body *').addClass("s")
  //JASON: YOU NEED TO FIGURE OUT JQUERY CODE TO ADD HTML BASED ON PATH === 'S'
  $("div").remove("#user1-response-row, #user2-response-row")
}

var socket = io('/video').connect(url, {
  secure:true
})

socket.emit('join', roomName)

$("#controls.s").append(

  "<div id='votingContainer'>\
    <div id='upvote1'>\
      <button id='user1up' type='button' class='vote'>\
        <i id='interaction-agree2' class='fa fa-thumbs-up interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div>\
    <div id='upCounter1'>\
      <p class='user1up'>0</p>\
    </div>\
    <div id='downvote1'>\
      <button id='user1down' type='button' class='vote'>\
        <i id='interaction-disagree2' class='fa fa-thumbs-down interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div> \
      <div id='downCounter1'>\
        <p class='user1down'>0</p>\
      </div>\
      <img src='/v/css/cg-logo.png'/>\
    <div id='upvote2'>\
      <button id='user2up' type='button' class='vote'>\
        <i id='interaction-agree2' class='fa fa-thumbs-up interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div>\
      <div id='upCounter2'>\
        <p class='user2up'>0</p>\
      </div>      \
    <div id='downvote2'>\
      <button id='user2down' type='button' class='vote'>\
        <i id='interaction-disagree2' class='fa fa-thumbs-down interaction-icons' aria-hidden='true'></i>\
      </button>\
    </div>\
      <div id='downCounter2'>\
        <p class='user2down'>0</p>\
      </div>\
  </div>")

$(".vote").on('click', function(e){
  
  var id = $(this).attr('id')

  counter[id] = counter[id] + 1

  socket.emit('spec vote', counter)
})

function seeCounter(obj) {
  counter = obj
  console.log(counter)
}

$.getJSON('/token/' + path, function (data) {
  identity = data.identity;

  socket.on('spec count', function(count) {
    // $("#spectators-counter").html(count)
    console.log('socket.on spec count:', count)
  })

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

  socket.on('spec count', function(count) {
    $("#spectators-counter").html(count)
  })

  socket.on('participant connect', function(user) {
    for(var i = 0; i < user.users.length; i+=1) {
      $(`#user${i}-identity`).html(user.users[i])
    }    
    // $("#user-identity").html(user.username)
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

  $("form").submit(function(e) {
    e.preventDefault()
    var value = $("#message").val()
    socket.emit('vid message', {
      user: identity,
      message: $("#message").val()
    })
    $("#message").val("");
  })

});



// Successfully connected!
function roomJoined(room) {
  activeRoom = room;
  // room.prototype.path = path
  room.path = path

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
    }, 1000)
  $("#waiting-overlay").css({display:"none"})
}

function adjustBackVideo() {
  $("#local-media").animate({
      bottom: '+=35%',
      height: "+=350px"
    }, 3000)
  $("#waiting-overlay").css({display:"block"})
}

function updateMessaging(user, value) {
    $("#chat-window").append(`<div class=${identity===user ? 'chat-window-row-left' : 'chat-window-row-right'}><li class= ${identity===user ? 'user-style' : 'other-style'}>${user}: ${value}</li></div>`).scrollTop($("#chat-window")[0].scrollHeight);
}


//jason twillio account config profile SID: VS9025d31d6b05358898fa6617bcc7cfc5
//jason twillio primary account SID: AC9835cee05e5e5f37ee066ccd9554cf83
//jason twillio account api key: SK538602cffe692e73127b5fc1626b4a2a
//jason twillio account api secret: N4VFpdTYtfl5QiYbDxQH0Wzecyh8WEXA

