import React from 'react'
import { browserHistory, Link } from 'react-router'
import styles from 'assets/styles/drawer.css'
import 'font-awesome/css/font-awesome.css'
import {getMessages} from 'api/messages'
import store from 'store'



const DrawerContainer = React.createClass ({
  getInitialState: function() {
    return {
      messages: [], 
      profiles: []    
    }
  }, 

  componentWillMount: function () {
    getMessages()
    this.unsubscribe = store.subscribe(() => {
      const appState = store.getState()
      this.setState({
        messages: appState.messages,
        profiles: []

      })
    })
  },

  componentWillUnmount: function() {
    this.unsubscribe()
  },

  render: function() {
    return (
      <DrawerView messages={this.state.messages} profiles={this.state.profiles}/>
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
  
  render: function () {
    return (
        <div className='drawer'>
          <div className='iconColumn'> 
            <button onClick={this.toggleMenu} className="messageButton">
              <i className="fa fa-comments" aria-hidden="true"></i>   
            </button> 
            <button className="messageButton">
              <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            </button>
            <button className="messageButton">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>            
          </div>
          <div>
            <div className={this.state.hidden ? "hidden messageColumn" : "messageColumn"}>
                <h4 className="messages">My Conversations</h4>
                 <ul className="chatList">
                   {this.props.profiles.map((user,i) =>{
                    return (
                      <li className='chats' key={'user' + i} id={'user' + user.id}>
                       {user.first_name}{user.last_name}
                      </li>
                    )
                  })}
                </ul>
            </div> 
          </div>
          <div>
             {this.props.children}
          </div>
        </div>
    )
  }
})

export default DrawerContainer

              



