import axios from 'axios'
import store from 'store'
import {browserHistory} from 'react-router'
import api from 'lib/api'

export function getProfile() {
  return api.get('/api/profile/').then(resp => {
    store.dispatch({
      type: 'GET_PROFILE',
      profile: resp.data
    })
  })
}

export function getProfiles(id) {
  return api.get('/api/profile/' + id).then(resp => {
    store.dispatch({
      type: 'GET_PROFILES',
      profile: resp.data
    })
  })
}
