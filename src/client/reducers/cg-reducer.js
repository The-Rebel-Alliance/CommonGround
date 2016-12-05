import * as actions from 'actions'

const defaultState = {
  logged: false,
  profiles: [],
  topics: [],
  profile: {}
}


export default function (state = defaultState, action) {
  switch (action.type) {
    case action.LOGIN:
      return {...state, logged: true}
    case 'GET_PROFILES':
      return {...state, profiles: action.profiles}
    case 'GET_PROFILE': 
      return {...state, profile: action.profile}
    case 'GET_TOPICS': 
      return {...state, topics: action.topics}
    case 'GET_MESSAGES':
      return {...state, messages: action.messages}
    case 'GET_CONVO':
      return {...state, message: action.messages}
    default:
      return state
  }
}
