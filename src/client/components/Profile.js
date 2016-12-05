import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getProfile} from 'api/profile'
import store from 'store'
import 'font-awesome/css/font-awesome.css'

import 'assets/styles/profile.css'

const ProfileContainer = React.createClass({
  getInitialState: function(){
    return{
      profile: {
        "first_name": "", 
        "last_name": "",
        "username": "",
        "city": "",
        "state": "", 
        "avatar": "",
        "political_affiliation": ""
      },
      topics: []
    }
  },
  componentWillMount: function(){
    getProfile(this.props.params.id)
        
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
      console.log('appState', appState)
        this.setState({
          profile: appState.profile[0]
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
  render: function (){
    return(
      <div>
        <div className="profile_container">
          <div className="profile_pic_container"><img className="profile_pic" src={this.props.profile.avatar}/></div>
          <div><button className="edit_button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</button></div>
          <div className="info_container"><h1 className="profile_names">{this.props.profile.first_name}</h1>&nbsp;<h1 className="profile_names">{this.props.profile.last_name}</h1>
          <h3 className="profile_username">({this.props.profile.username})</h3>
            <p className="city_state">{this.props.profile.city}&nbsp;{this.props.profile.state}</p>
            <p className="city_state">Political Affiliation:&nbsp;{this.props.profile.political_affiliation}</p>

          </div>
        </div>
      </div>
    
      )
  }
})

export default ProfileContainer
