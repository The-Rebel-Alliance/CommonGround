import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getProfile} from 'api/profile'
import store from 'store'
import 'font-awesome/css/font-awesome.css'

import 'assets/styles/profile.css'

const ProfileContainer = React.createClass({
  getInitialState: function(){
    return {
      "id": "",
      "first_name": "", 
      "last_name": "",
      "username": "",
      "city": "",
      "state": "", 
      "avatar": "",
      "political_affiliation": "",
      "topics": []
    }
  },
  componentWillMount: function(){
    getProfile(this.props.params.id)
        
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
      console.log('appstate.profile', appState.profile)
      this.setState(appState.profile) 
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  
  render: function(){
    return (
      <CommonProfile {...this.state} />
    )
  } 
}) 
const CommonProfile = React.createClass({
  goToEdit: function() {
    browserHistory.push("/editprofile")
    
  },
  render: function (){
    return(
      <div>
          <div className="profile_container">
            <div className="profile_pic_container"><img className="profile_pic" src={this.props.avatar}/></div>
            <div><button onClick={this.goToEdit} className="edit_button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</button></div>
            <div className="info_container"><h1 className="profile_names">{this.props.first_name}</h1>&nbsp;<h1 className="profile_names">{this.props.last_name}</h1>
            <h3 className="profile_username">({this.props.username})</h3>
              <p className="city_state">{this.props.city}&nbsp;{this.props.state}</p>
              <p className="city_state">Political Affiliation:&nbsp;{this.props.political_affiliation}</p>

            </div>
          </div>
        <div className="topic_table">Topic Positions:</div>
        <div className="topics_container">
        {this.props.topics.map(item => {
          return (
          <div className="indiv_topic_container">
            <h3 className="topic_header">{item.name}</h3>
            <p className="topic_stance">{item.stance}</p>
          </div>
          )
        })}
            
        </div>
      </div>
    
      )
  }
})

export default ProfileContainer
