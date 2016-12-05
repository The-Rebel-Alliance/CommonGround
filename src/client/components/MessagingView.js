import React from 'react'
import { browserHistory, Link } from 'react-router'
import store from 'store'
import users from 'api/users'
import 'assets/styles/MessagingContainer.css'
import Drawer from './Drawer'
import { getConvo } from 'api/convo'


const MessagingView = React.createClass({ 
  render: function(){
    return(
      <div id="messagingContainer">
        <div id="messages">
          <h4>My conversation with (user)</h4>
          <ul>
            {this.props.myconvo.map((chat,i) => {
              return (
                <li id={'chat' + i} key={'chat' + i}>
                  {chat.first_name}{chat.message}
                </li>
              )
             })}
          </ul>
        </div>
        <div id="textboxContainer">
          <form id="textBox">
            <input type="text" name="textBox" id="inputBox"></input><button>Submit</button>
          </form>
        </div>
      </div>
    )
  }
})

export default MessagingView
 
 
 

