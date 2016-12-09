import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'
import * as actions from 'actions'

api.new('/')

export function getConvo(id){
  console.log('id', id)
  return api.get('/api/messages/' + id).then(resp =>{  
    console.log ("chats", resp)
    store.dispatch({
      type: actions.GET_MYCONVO,
      fromId: resp.data.id,
      myconvo: resp.data.messages
    })
  })
}
