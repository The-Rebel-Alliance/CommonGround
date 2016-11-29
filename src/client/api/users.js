import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'

api.new('/')
api.setTokenPath('/login')

export function createUser(obj) {
    return axios.post('/register', {username:username, password:password}).then(function(resp){
        browswerHistory.push("/")
    })
}


export function login(username, password) {
  return api.login(username, password, function success() {
    browserHistory.push('/dashboard')
  })
}
