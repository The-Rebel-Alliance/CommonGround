import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'
import * as actions from 'actions'
import {toggleDrawer} from './toggleDrawer'
import {subscribe} from 'lib/pubsub'
import io from 'socket.io-client'

api.new('/')

var url = location.href.substr(0, location.href.indexOf(location.pathname))

var socket = io('/messaging').connect(url, {
  secure:true
})

subscribe('messageConnect', function(token){
  socket.emit('join', token)

  socket.on('new message', function(fromId){
    getMessageUsers(function(){
      getConvo(fromId)
    })
  })
})


export function getConvo(id){
  return api.get('/api/messages/' + id).then(resp =>{  
    store.dispatch({
      type: actions.GET_MYCONVO,
      fromId: resp.data.id,
      myconvo: resp.data.messages,
      avatar: resp.data.avatar
    })
  })
}

export function getMessageUsers(cb){
  return api.get('/api/messages').then(resp =>{ 
    store.dispatch({
      type: actions.GET_MESSAGE_USERS,
      messageUsers: resp.data
    })
    if (cb) {
      cb()
    }
  })
}

export function sendMsg(msg){
  return api.post('/api/message', msg).then(resp => {
    socket.emit('new message', msg.toId)
    getMessageUsers(function(){
      getConvo(msg.toId)
    })
  })
}

export function sendMsgFromProfile(msg) {
  return api.post('/api/message', msg).then(resp => {
    getMessageUsers(function(){
      getConvo(msg.toId)
      toggleDrawer()
    })
  })
}
