import axios from 'axios'
import store from 'store'
import {browserHistory} from 'react-router'
import api from 'lib/api'



export function getProfiles(userId) {
  return api.get('/api/profile/:id').then(resp => {
    console.log('profile_resp', resp)
    store.dispatch({
      type: 'GET_PROFILES',
      profile: resp.data
    })
  })
}
