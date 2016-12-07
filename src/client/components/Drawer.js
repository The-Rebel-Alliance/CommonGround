import React from 'react'
import { browserHistory, Link } from 'react-router'
import styles from 'assets/styles/drawer.css'
import 'font-awesome/css/font-awesome.css'
import { getMessageUsers } from 'api/getMessages'
import { getConvo } from 'api/getConvo'
import store from 'store'
// import MessagingView from 'MessagingView'
import Logo from 'assets/images/cg-logo.png'



const DrawerContainer = React.createClass ({
  getInitialState: function() {
    return {
      messageUsers:[],
      myconvo:[],
      roomLink: ''
    }
  }, 
  componentWillMount: function(){
    getMessageUsers()
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
      console.log(appState.messageUsers)
      this.setState({
        messageUsers: appState.messageUsers,
        myconvo: appState.myconvo,
        roomLink: appState.roomLink
      })
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  render: function() {
    return (
      <DrawerView messageUsers={this.state.messageUsers} myconvo={this.state.myconvo} roomLink={this.state.roomLink}/>
    )
  }
})

const DrawerView = React.createClass({
  getInitialState: function() {
    return {
      hidden:true
    }
  },
  toggleMenu: function() {
    var that = this;
    this.setState({
      hidden:!that.state.hidden
    })
  },
  selectUser: function(e) {
    e.preventDefault()
    var id = e.currentTarget.id
    id = Number(id.substr(7))
    getConvo(id)
  },
  render: function () {
    return ( 
        <div className="layout">
          <div className="header">
              <h1><img className="logo_cg" src={Logo}/></h1>
          </div>
          <div className='iconColumn'> 
            <button onClick={this.toggleMenu} className="messageButton">
              <i className="fa fa-comments" aria-hidden="true"></i>   
            </button> 
            <Link to="/profile">
              <button className="messageButton">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="messageButton">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </Link>            
              <button className="messageButton">
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </button>  
          </div>
          <div className="movingParts">
            <div className={this.state.hidden ? "hidden messageColumn" : "messageColumn"}>
                <h4 className="myConvo">My Conversations</h4>
                 <ul className="chatList">                            
                     {this.props.messageUsers.map((user, i) =>{
                      return (
                        <li id={'msguser' + user.id} onClick={this.selectUser} key={'messagesUser' + user.id}>
                          <img src={user.avatar}/> 
                          {user.first_name} {user.last_name}
                          <a href="{this.props.roomLink}" target="" id="videoIcon">
                           <i className="fa fa-video-camera" aria-hidden="true" ></i>                  
                          </a>
                        </li>
                      )
                    })}
                </ul>
            </div> 
          </div>
        </div>
    )            
  }
})

export default DrawerContainer
// <MessagingView  myconvo={this.props.myconvo}/>



