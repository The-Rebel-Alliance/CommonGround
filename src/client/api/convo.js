import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'

api.new('/')

export function getConvo(id){
  return api.get( `/api/messages/${id}`).then(resp =>{  
    console.log ("chats", resp)
    store.dispatch({
      type: 'GET_MYCONVO',
      myconvo: resp.data
    })
  })
}
