import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'

api.new('/')

export function getMessageUsers(){
  return api.get( '/api/messages').then(resp =>{ 
  console.log("message", resp ) 
    store.dispatch({
      type: 'GET_MESSAGEUSERS',
      messageusers: resp.data
    })
  })
}


