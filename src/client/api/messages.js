import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'

api.new('/')

export function getMessages (){
  return axios.get('/messages').then(resp =>{  
    store.dispatch({
      type: 'GET_MESSAGES',
      messages: resp.data
    })
  })
}
