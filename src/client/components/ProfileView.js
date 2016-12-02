import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getProfile} from 'api/profile'
import store from 'store'

import 'assets/styles/profileview.css'

const ProfileContainer = React.createClass({
  getInitialState: function(){
    return{
      profile: {
        firstName:"", 
        lastName:"", 
        city:"",
        state:"", 
        avatar:""
      },
      topics: []
    }
  },
  componentWillMount: function(){
    getProfile(this.props.params.id)
        
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
        this.setState({
          profile: appState.profile
      }) 
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  
  render: function(){
    return (
      <CommonProfile profile={this.state.profile}/>
      )
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
     
        <span>{this.props.profile.avatar}</span>
        <span>{this.props.profile.firstName}</span>
        <span>{this.props.profile.lastName}</span>
        <span>{this.props.profile.city}</span>
        <span>{this.props.profile.state}</span>
        
        <button>Edit my Profile</button>
     </div>
      )
  }
})

export default ProfileContainer

// {this.props.topics.map(item =>{
//           return(
//           <span>{item.topics}</span>
//           )
//         })}
