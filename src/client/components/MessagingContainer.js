import React from 'react'
import { browserHistory, Link } from 'react-router'
import users from 'api/users'
import 'assets/styles/MessagingContainer.css'
import TextBox  from 'components/TextBox'

const MessagingContainer = React.createClass({
    render: function(){
      return(
          <div id="messagingContainer">
            <div id="messages">
              <ul>
                  <div id="username"><h6>(James Shabo)</h6></div>
                <img src="http://orig02.deviantart.net/33e4/f/2010/188/6/a/twokinds_fanart___avatar_sized_by_turaiel.gif"></img><div id="time"><h6>(12:00am)</h6></div>
                  <li>:I'm Great! What are your views on (insert topic here)</li> <br />
                <img src="http://orig02.deviantart.net/33e4/f/2010/188/6/a/twokinds_fanart___avatar_sized_by_turaiel.gif"></img><div id="time"><h6>(12:00am)</h6></div>
                  <li>:I'm Great! What are your views on (insert topic here)</li> <br />
                <img src="http://orig02.deviantart.net/33e4/f/2010/188/6/a/twokinds_fanart___avatar_sized_by_turaiel.gif"></img><div id="time"><h6>(12:00am)</h6></div>
                  <li>:I'm Great! What are your views on (insert topic here)</li> <br />
                </ul>
              <TextBox />
            </div>
          </div>
      )
    }
})

export default MessagingContainer
