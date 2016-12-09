import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'
import * as actions from 'actions'
import { getConvo } from 'api/getConvo'
import {toggleDrawer} from 'api/toggleDrawer' 

api.new('/')

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
