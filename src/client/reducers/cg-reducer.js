import * as actions from 'actions'

const defaultState = {
  logged: false,
  users: [],
  topics: [],
  user: {}
}


export default function (state = defaultState, action) {
  switch (action.type) {
    case action.LOGIN:
      return {...state, logged: true}
    case 'GET_USERS':
      return {...state, users: action.users}
    case 'GET_USER': 
      return {...state, user: action.user}
    case 'GET_TOPICS': 
      return {...state, topics: action.topics}
    default:
      return state
  }
}
