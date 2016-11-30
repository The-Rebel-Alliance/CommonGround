import axios from 'axios'
import store from 'store'
import { browserHistory } from 'react-router'
import api from 'lib/api'

api.new('/')

export function getTopics() {
  axios.get('api/topics').then (function(resp) {
    store.dispatch({
      type: 'GET_TOPICS',
      topics: resp.data
    })
  })
}

export function getProfile() {
  axios.get('api/profile').then (function(resp) {
    store.dispatch({
      type: 'GET_Profile',
      profile: resp.data
    })
  })
}
