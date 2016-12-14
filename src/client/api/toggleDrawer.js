import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'
import * as actions from 'actions'
import {getMessageUsers} from 'api/messages'

api.new('/')

export function toggleDrawer(){
  const appState = store.getState()
  getMessageUsers(function(){
    store.dispatch({
      type: actions.CHANGE_DRAWER,
      hidden: !appState.hidden
    })
  })
}

export function closeDrawer() {
  store.dispatch({
    type: actions.CHANGE_DRAWER,
    hidden: true
  })
}
