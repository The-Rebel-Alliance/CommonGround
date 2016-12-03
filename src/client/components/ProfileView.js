import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getProfiles} from 'api/profile'
import store from 'store'

import 'assets/styles/profileview.css'

const ProfileContainer = React.createClass({
  getInitialState: function(){
    return{
      profiles: {
        first_name:"", 
        last_name:"", 
        city:"",
        state:"", 
        avatar:""
      },
      topics: []
    }
  },
  componentWillMount: function(){
    getProfiles(this.props.params.id)
        
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
        this.setState({
          profiles: appState.profiles
      }) 
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  
  render: function(){
    return (
      <CommonProfile profiles={this.state.profiles}/>
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
        <img src={this.props.profiles.avatar}/>
        <span>{this.props.profiles.first_name}</span>
        <span>{this.props.profiles.last_name}</span>
        <span>{this.props.profiles.city}</span>
        <span>{this.props.profiles.state}</span>
        
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
