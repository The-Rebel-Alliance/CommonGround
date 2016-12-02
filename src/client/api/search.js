import axios from 'axios'
import store from 'store'
import {browserHistory} from 'react-router'
import api from 'lib/api'

export function searchUsers(topicId) {
  return api.get(`/api/search/${topicId}`).then(resp => {
    console.log('resp', resp)
    store.dispatch({
        type: 'GET_PROFILES',
        profiles: resp.data
    })
  }) 
}
