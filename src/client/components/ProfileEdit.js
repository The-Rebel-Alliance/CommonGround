import React from 'react'
import {getProfile} from 'api/profile'

const ProfileEditContainer = React.createClass({
  getInitialState: function() {
    return {
      profile: {
        username: '',
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        avatar: '',
        politicalAffiliation: '',
      },
      topics: []
    }
  },
  componentWillMount: function() {
    getProfile(this.props.params.id)
        this.unsubscribe = store.subscribe(() => {
          const appState = store.getState()
          this.setState({
              profile: appState.profile
          })
        })
  },
  render: function () {
    return (
      <ProfileEdit />
    )
  }
})

const ProfileEdit = React.createClass({
  render: function () {
    return (
      <div>Hello World</div>
    )
  }
})


export default ProfileEditContainer
