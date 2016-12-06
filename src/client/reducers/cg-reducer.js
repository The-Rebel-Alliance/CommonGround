import * as actions from 'actions'

const defaultState = {
  logged: false,
  profiles: [],
  topics: [],
  profile: {},
  messageUsers:[],
  myconvo: []
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
    case 'GET_USER_PROFILE':
      return {...state, profile: action.profile}
    case actions.GET_MESSAGE_USERS:
      return {...state, messageUsers: action.messageUsers}
    case actions.GET_MYCONVO:
      return {...state, myconvo: action.myconvo}
    default:
      return state
  }
}
