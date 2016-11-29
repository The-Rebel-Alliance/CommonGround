import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'

api.new('/')

export function getTopics() {
  return api.get('api/topics').then(resp => {
    store.dispatch({
        type: 'GET_TOPICS',
        topics: resp.data
    })
  }) 
}
