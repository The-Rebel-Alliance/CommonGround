import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'
import * as actions from 'actions'

api.new('/')

export function sendMsg(msg, id){
  return api.post('/api/message', msg, + id).then(resp =>{
    browswerHistory.push(`/messages/,msg, ${id}`)
  })
}
