import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getProfiles} from 'api/profile'
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
        avatar:"",
        politicalAffiliation: ""
      },
      topics: []
    }
  },
  componentWillMount: function(){
    getProfiles(this.props.params.id)
        
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
      <div>
        <div className="profile_container">
          <div className="profile_pic"></div>
        </div>
      </div>
    
      )
  }
})
