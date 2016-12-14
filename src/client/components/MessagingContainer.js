import React from 'react'
import { browserHistory, Link } from 'react-router'
import users from 'api/users'
import 'assets/styles/MessagingContainer.css'

const MessagingContainer = React.createClass({
    render: function(){
      return(
          <div id="messagingContainer">
            <div id="messages">
              <div className="message">
              <ul>
                <div id="username"><h5>(James Shabo)</h5></div><div id="time"><h6>(12:00am)</h6></div>
                  <img src="http://orig02.deviantart.net/33e4/f/2010/188/6/a/twokinds_fanart___avatar_sized_by_turaiel.gif"></img>
                  <li>:I'm Great! What are your views on (insert topic here)</li> <br />
                </ul>
                </div>
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
