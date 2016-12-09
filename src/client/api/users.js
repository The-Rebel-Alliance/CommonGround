import axios from 'axios'
import store from 'store'
import {browserHistory} from 'react-router'
import api from 'lib/api'

api.new('/')
api.setTokenPath('/login')

export function createUser(obj) {
    console.log('obj', obj)
    return axios.post('/register', obj).then(function(resp){
        browserHistory.push("/") 
    })
    console.log('resp', resp)
  }

export function login(username, password) {
  return api.login(username, password, function success() {
    browserHistory.push("/dashboard")
  })
}

export function logout(username, password) {
  return api.logout(username, password, function success() {
    browserHistory.push("/")
  })
}



