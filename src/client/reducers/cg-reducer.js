import * as actions from 'actions'

const defaultState = {
  logged: false,
  profiles: [],
  topics: [],
  profile: {},
  messageusers:[],
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
    case actions.GET_MESSAGE_USERS:
      return {...state, messageusers: action.messageusers}
    case actions.GET_MYCONVO:
      return {...state, myconvo: action.myconvo}
    default:
      return state
  }
}
