import axios from 'axios'
import react from 'react' 
import {browserHistory} from 'react-router'


export default function addUser() {
  axios.post('users', obj).then(resp => {
    browserHistory.push('/dashboard/' + resp.data.id)
  })
}
