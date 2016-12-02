import axios from 'axios'
import store from 'store'
import {browserHistory} from 'react-router'
import api from 'lib/api'

api.new('/')
api.setTokenPath('/login')

export function createUser(obj) {
    return axios.post('/register', obj).then(function(resp){
      console.log(resp)
        browserHistory.push("/") 
    })
  }


export function login(username, password) {
  return api.login(username, password, function success() {
    browserHistory.push('/drawer')
  })
}
