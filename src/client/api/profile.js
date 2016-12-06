import axios from 'axios'
import store from 'store'
import {browserHistory} from 'react-router'
import api from 'lib/api'

export function getProfile() {
  return api.get('/api/profile').then(resp => {
    store.dispatch({
      type: 'GET_PROFILE',
      profile: resp.data
    })
  })
}

export function getOtherProfiles(id) {
  return api.get('/api/profile/' + id).then(resp => {
    store.dispatch({
      type: 'GET_PROFILE',
      profile: resp.data
    })
  })
}


export function editProfile(id, topicId) {
  return api.put('/api/profile/' + id).then(resp => {
    browserHistory.push('/api/profile')
  })
}
