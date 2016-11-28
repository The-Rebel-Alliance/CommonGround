import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getProfile} from 'api/commonGroundapi'
import store from 'store'

import 'assets/styles/profileview.css'

const ProfileContainer = React.createClass({
  getInitialState: function(){
    return{
      
    }
  },
  componentWillMount: function(){
    getProfile(this.props.params.id)
        
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
        this.setState({
          
      }) 
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  
  render: function(){
    return (<CommonProfile {...this.state}/>)
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

     </div>
      )
  }
})

export default ProfileContainer
