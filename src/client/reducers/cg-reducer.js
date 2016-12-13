import * as actions from 'actions'

const defaultState = {
  logged: false,
  logout: false,
  profiles: [],
  topics: [],
  profile: {},
  messageUsers:[],
  sentTo:[],
  myconvo: [],
  message:'',
  roomLink:'',
  fromId:null,
  avatar:'',
  hidden:true
}


export default function (state = defaultState, action) {
  switch (action.type) {
    case action.LOGIN:
      return {...state, logged: true}
    case action.LOGOUT:
      return {...state, logout: true}
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
      return {...state, myconvo: action.myconvo, fromId:action.fromId, avatar:action.avatar}
    case actions.SEND_MSG:
      return {...state, message:action.message}
    // case actions.SENT_TO:
    //   return {...state, sentTo:action.sentTo}
    case actions.GET_ROOM:
      return {...state, roomLink: action.roomLink}
    case actions.CHANGE_DRAWER:
      return {...state, hidden: action.hidden}
    case actions.GET_LIVE_ROOMS:
      return {...state, liveRooms: action.liveRooms}
    default:
      return state
  }
}
