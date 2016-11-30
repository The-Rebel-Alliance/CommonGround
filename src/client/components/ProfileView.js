import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getProfile} from 'api/profile'
import store from 'store'

import 'assets/styles/profileview.css'

const ProfileContainer = React.createClass({
  getInitialState: function(){
    return{
      profile: {
        first_name:"", 
        last_name:"", 
        city:"",
        state:"", 
        avatar:"", 
        user_id:0
      },
      topics: []
    }
  },
  componentWillMount: function(){
    getProfile(this.props.params.id)
        
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
        this.setState({
          profile: appState.currentUser
      }) 
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  
  render: function(){
    return (<CommonProfile profile={this.state.profile}/>)
    } 
})
const CommonProfile = React.createClass({
  goBack: function (e) {
    e.preventDefault()
    hashHistory.goBack()
  },
  render: function (){
    return(
     <div id="profile_container">
      <button onClick{this.goBack}>Go Back</button>
        <span>{this.props.profile.avatar}</span>
        <span>{this.props.profile.first_name}</span>
        <span>{this.props.profile.last_name}</span>
        <span>{this.props.profile.city}</span>
        <span>{this.props.profile.state}</span>
        {this.props.topics.map(item =>{
          return(
          <span>{item.topics}</span>
          )
        })}
        <button>Edit my Profile</button>
     </div>
      )
  }
})

export default ProfileContainer
