import React from 'react'
import {getProfile} from 'api/profile'
import store from 'store'

const ProfileEditContainer = React.createClass({
  getInitialState: function() {
    return {
      profile: {
        id: '',
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
      <ProfileEdit profile={this.state.profile} />
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
