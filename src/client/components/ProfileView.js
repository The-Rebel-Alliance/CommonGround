import React from 'react'
import store from 'store'
import {Link, browserHistory} from 'react-router'
import {getUserProfile} from 'api/profile'
import { sendMsg, sendMsgFromProfile } from 'api/sendMsg'
import { getMessageUsers, sentMsgTo } from 'api/getMessages'



import 'assets/styles/profile.css'

const OtherProfileContainer = React.createClass({
  getInitialState: function(){
    return{
      "id": "",
      "first_name": "", 
      "last_name": "",
      "username": "",
      "city": "",
      "state": "", 
      "avatar": "",
      "political_affiliation": "",
      "topics": [],
       sentTo:[]
    }   
  },
  componentWillMount: function(){
    getUserProfile(this.props.params.id)
        
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
        this.setState(appState.profile)
        sentTo:appState.sentTo
    }) 
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  
  render: function(){
    return (
      <CommonOtherProfile {...this.state} id={this.props.params.id} sentTo={this.state.sentTo}/>
    )
  } 
})
const CommonOtherProfile = React.createClass({
  handleSubmit: function(e){
    e.preventDefault()
    var msg = {
      message: "I'd like to chat!",
      toId:this.props.id
    }
    sendMsgFromProfile(msg)
    
   
  },
  render: function (){
    return(
      <div>
        <div className="profile_container">
          <div className="profile_pic_container"><img className="profile_pic" src={this.props.avatar}/></div>
          <div>
            <Link to="/Drawer" >
              <button onClick={this.handleSubmit} className="edit_button">
                <i className="fa fa-comments" aria-hidden="true"></i> 
                Message Me
              </button>
            </Link>
           </div>
          <div className="info_container"><h1 className="profile_names">{this.props.first_name}</h1>&nbsp;<h1 className="profile_names">{this.props.last_name}</h1>
            <h3 className="profile_username">({this.props.username})</h3>
            <p className="city_state">{this.props.city}&nbsp;{this.props.state}</p>
            <p className="city_state">Political Affiliation:&nbsp;{this.props.political_affiliation}</p>
          </div>
        </div>
        <div className="topic_table">Topics of Interest and Stances:</div>
        <div className="topics_container">
          {this.props.topics.map(item => {
            return (
              <div key={item.id} className="indiv_topic_container">
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

export default OtherProfileContainer

