import React from 'react'
import store from 'store'
import { browserHistory, Link } from 'react-router'
import 'assets/styles/MessagingContainer.css'
import { getConvo, sendMsg, getMessageUsers } from 'api/messages'
import { toggleDrawer, closeDrawer } from 'api/toggleDrawer'
import ChatWindow from 'components/ChatWindow'

const MessagingView = React.createClass({
  getInitialState: function() {
    return {
      message:'',
      toId: '',
      avatar:'' 
    }
  },
 
  handleSubmit: function(e) {
    e.preventDefault()
    var msg = {
      message:this.state.message,
      toId:this.props.fromId
    }
    sendMsg(msg)
    this.setState({
      message: ''
    })
  },
  update: function(e) {
    var val = e.target.value
    var id = e.target.id
    var msgObj = {}
    msgObj[id] = val
    this.setState(msgObj)
  },
  generateRoom: function(e){
    e.preventDefault()
    var roomId = this.generateRoomId()
    sendMsg({
      message: `/v/${roomId}`,
      toId:this.props.fromId
    })
  },
  generateRoomId: function() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
  },
  goToProfile: function(e){
    e.preventDefault()
    closeDrawer()
    browserHistory.push('/profile/' + this.props.fromId)
  },
  render: function(){
    return(
      <div id="messagingContainer">
        <div id="messages">
          <h4>My conversation with 
             <a onClick={this.generateRoom} className="videoIcon">
               <i className="fa fa-video-camera" aria-hidden="true" >
               </i>                  
             </a>
          </h4>
          <ul>
            {this.props.myconvo.map((chat,i) => {
              if (/^\/v\//.test(chat.message)) {
                return (
                  <li id={'chat' + i} key={'chat' + i}>
                    {chat.username}: <a href={chat.message} target="_blank">{chat.message} <i className="fa fa-video-camera" aria-hidden="true"></i></a>
                  </li>
                )
              } else {
                return (
                  <li id={'chat' + i} key={'chat' + i}>
                    {chat.username} : {chat.message} 
                  </li>
                )
              }
             })}
            </ul>
          </div>
        </div>
         <div id="textboxContainer">
            <form onSubmit={this.handleSubmit}id="textBox">
              <input value={this.state.message} onChange={this.update} type="text" name="textBox" id="message"></input>
              <button type="submit" id="submitButton">Submit</button>
            </form>
          </div>
        <h4 className="messagesHeader">
          <div className="profileLink">
            <a onClick={this.goToProfile}>
              <img className="avatarLink"src={this.props.avatar}/>            
            </a>
          </div>
          <div className="videoLinkContainer">
            <a onClick={this.generateRoom}>
              Video Chat&nbsp;
              <i id="videoLink" className="fa fa-video-camera" aria-hidden="true"></i>
            </a>
          </div>
        </h4>
          <ChatWindow myconvo={this.props.myconvo} />
        <div id="textboxContainer">
          <form onSubmit={this.handleSubmit}id="textBox">
            <input className="chat_submit" value={this.state.message} onChange={this.update} type="text" name="textBox" id="message"></input>
            <button type="submit">Submit</button>
          </form>
        </div>

    )
  }
})

export default MessagingView
 
 
 

