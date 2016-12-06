import React from 'react'
import { browserHistory, Link } from 'react-router'
import users from 'api/users'
import 'assets/styles/MessagingContainer.css'

const MessagingContainer = React.createClass({
    render: function(){
      return(
          <div id="messagingContainer">
            <div id="messages">
            <div id="textboxContainer">
              <form id="textBox">
                <input type="text" name="textBox" id="inputBox"></input><button>Submit</button>
              </form>
              </div>
            </div>
          </div>
    )
  }
})



export default MessagingContainer
