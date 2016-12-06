import React from 'react'
import { browserHistory, Link } from 'react-router'
import store from 'store'
import users from 'api/users'
import 'assets/styles/MessagingContainer.css'
import Drawer from './Drawer'
import { getConvo } from 'api/getConvo'
import { sendMsg } from 'api/sendMsg'


const MessagingView = React.createClass({ 
  getInitialState: function() {
    return {
      username:'',
      message:'',
      id: ''
    }
  },
  handleSubmit: function (e) {
    e.preventDefault()
    var msg = {
      username:this.state.username,
      message:this.state.message,
      id: this.state.id
    }
    sendMsg(msg)   
  },
  update: function(e) {
    var val = e.target.value
    var id = e.target.id
    var msgObj = {}
    msgObj[id] = val
    this.setState(msgObj)
  },
  render: function(){
    return(
      <div id="messagingContainer">
        <div id="messages">
          <h4>My conversation </h4>
          <ul>
            {this.props.myconvo.map((chat,i) => {
              return (
                <li id={'chat' + i} key={'chat' + i}>
                  {chat.username}:  {chat.message} 
                </li>
              )
             })}
          </ul>
        </div>
        <div id="textboxContainer">
          <form onSubmit={this.handleSubmit}id="textBox">
            <input onChange={this.update} type="text" name="textBox" id="inputBox"></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
})

// export default MessagingView
 
 
 

