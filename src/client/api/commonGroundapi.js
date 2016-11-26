
import * as actions from 'actions'
import store from 'store'
import {browserHistory} from 'react-router'

axios.defaults.baseURL = 'http://localhost:8001/'


export function getProfile(id) {
  return axios.get('profiles/' + id).then(resp => {
    store.dispatch({
      type: 'GET_PROFILE',
      profile: resp.data
    }) 
  }) 
}
