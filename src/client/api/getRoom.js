import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'
import * as actions from 'actions'

api.new('/')

export function getRoom() {
  return api.get('/api/generateRoomLink').then(resp => {
    store.dispatch({
      type:actions.GET_ROOM,
      roomLink: resp.data
    })  
  })
}
