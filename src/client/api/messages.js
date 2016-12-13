import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'
import * as actions from 'actions'
import {toggleDrawer} from './toggleDrawer'


api.new('/')

export function getConvo(id){
  console.log('id', id)
  return api.get('/api/messages/' + id).then(resp =>{  
    console.log ("chats", resp)
    store.dispatch({
      type: actions.GET_MYCONVO,
      fromId: resp.data.id,
      myconvo: resp.data.messages,
      avatar: resp.data.avatar
    })
  })
}

export function getMessageUsers(){
  return api.get('/api/messages').then(resp =>{ 
    store.dispatch({
      type: actions.GET_MESSAGE_USERS,
      messageUsers: resp.data
    })
  })
}

export function sendMsg(msg){
  console.log(msg)
  return api.post('/api/message', msg).then(resp => {
    getConvo(msg.toId)
  })
}

export function sendMsgFromProfile(msg) {
  return api.post('/api/message', msg).then(resp => {
    getConvo(msg.toId)
    toggleDrawer()
  })
}
