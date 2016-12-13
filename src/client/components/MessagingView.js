import React from 'react'
import ReactDOM from 'react-dom'
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
 componentDidUpdate: function(){
       
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
        <h4 className="messagesHeader">
          <div className="profileLink">
            <a onClick={this.goToProfile}>
              <img className="avatarLink"src={this.props.avatar}/>                        
            </a>
          </div>
          <div className="videoLinkContainer">
            <a onClick={this.generateRoom} >
              Video Chat&nbsp;
              <i id="videoLink" className="fa fa-video-camera" aria-hidden="true" ></i>
            </a>
          </div>
        </h4>
        <ChatWindow myconvo={this.props.myconvo} />
        <div id="textboxContainer">
          <form onSubmit={this.handleSubmit}id="textBox">
            <input className="chat_submit" value={this.state.message} onChange={this.update} type="text" name="textBox" id="message"/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
})

export default MessagingView
 
 
 

