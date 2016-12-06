import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'
import * as actions from 'actions'

api.new('/')

export function sendMsg(msg){
  console.log(msg)
  return api.post('/api/message', msg).then(resp => {
    console.log('resp', resp)
    browswerHistory.push(`/messages/${id}`)
  })
}
