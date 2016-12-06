import React from 'react'
import {getProfile} from 'api/profile'
import store from 'store'

import 'assets/styles/editProfile.css'

const ProfileEditContainer = React.createClass({
  getInitialState: function() {
    return {
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        city: '',
        state: '',
        avatar: '',
        political_affiliation: '',
        topics: []
    }
  },
  componentWillMount: function() {
    getProfile(this.props.params.id)
        this.unsubscribe = store.subscribe(() => {
          const appState = store.getState()
          this.setState({
            id: appState.id,
            username: appState.username,
            first_name: appState.first_name,
            last_name: appState.last_name,
            city: appState.city,
            state: appState.state,
            avatar: appState.avatar,
            political_affiliation: appState.political_affiliation,
            topics: []
          })
        })
  },
  render: function () {
    return (
      <ProfileEdit {...this.state} />
    )
  }
})

const ProfileEdit = React.createClass({
  render: function () {
    return (
      <div className="edit_container">
        <label name="First Name">{this.state.first_name}</label><input type="text" />
        <label name="Last Name">{this.state.last_name}</label><input type="text" />
      </div>
    )
  }
})


export default ProfileEditContainer
