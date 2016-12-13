import axios from 'axios'
import store from 'store'
import {browserHistory} from 'react-router'
import api from 'lib/api'
import io from 'socket.io-client'
import * as actions from 'actions'

var url = location.href.substr(0, location.href.indexOf(location.pathname))

export function searchUsers(topicId) {
  return api.get(`/api/search/${topicId}`).then(resp => {
    console.log('resp', resp)
    store.dispatch({
        type: 'GET_PROFILES',
        profiles: resp.data
    })
  }) 
}

var socket = io('/video').connect(url, {
  secure:true
})

socket.emit('livetrack')

socket.on('rooms update', function(rooms){
  store.dispatch({
    type: actions.GET_LIVE_ROOMS,
    liveRooms: rooms
  })
})
