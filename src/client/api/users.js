import axios from 'axios'
import store from 'store'
import {browswerHistory} from 'react-router'
import api from 'lib/api'

api.new('/')
api.setTokenPath('/login')

export function createUser(obj) {
    return axios.post('/register', {username: obj.username, password: obj.password, first_name: obj.first_name, last_name: obj.last_name, avatar: obj.avatar, city: obj.city, state: obj.state, political_affiliation: obj.political_affiliation}).then(function(resp){
      console.log(resp)
        browswerHistory.push("/") 
    })
  }


export function login(username, password) {
  return api.login(username, password, function success() {
    browserHistory.push("/")
  })
}
