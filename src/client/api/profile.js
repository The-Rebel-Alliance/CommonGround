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

export function getUserProfile(id) {
  return api.get('/api/profile/' + id).then(resp => {
    store.dispatch({
      type: 'GET_PROFILE',
      profile: resp.data
    })
  })
}


export function editProfile(obj) {
  console.log('obj', obj)
  return api.put('/api/profile/', obj).then(resp => {
    browserHistory.push('/edittopics')
  })
}

export function editTopics(obj) {
  console.log('topics', obj)
  return api.put('/api/profile/', obj).then(resp => {
    browserHistory.push('/editstances')
    console.log('resp', resp)
  })
}
