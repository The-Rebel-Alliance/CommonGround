import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'

api.new('/')

export function getConvo(from_profile_id){
  return api.get( `/api/messages${from_profile_id}`).then(resp =>{  
    store.dispatch({
      type: 'GET_CONVO',
      message: resp.data
    })
  })
}
