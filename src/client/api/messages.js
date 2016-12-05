import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'
import * as actions from 'actions'

api.new('/')

export function getMessageUsers(){
  return api.get('/api/messages').then(resp =>{ 
    store.dispatch({
      type: actions.GET_MESSAGE_USERS,
      messageusers: resp.data
    })
  })
}


