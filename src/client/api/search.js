import axios from 'axios'
import store from 'store'
import {browserHistory} from 'react-router'
import api from 'lib/api'

api.new('/')

export function searchUsers(topicId) {
  return api.get(`/search/${topicId}`).then(resp => {
    store.dispatch({
        type: 'GET_PROFILES',
        profiles: resp.data
    })
    console.log('resp', resp)
  }) 
}
