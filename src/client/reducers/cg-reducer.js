import * as actions from 'actions'

const defaultState = {
  profile: {}
}


export default function (state = defaultState, action) {
  switch (action.type) {
      case 'Get_PROFILE':
        return {...state, profile: action.profile}
      default:
        return state
  }
}
