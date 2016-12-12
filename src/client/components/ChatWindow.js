import React from 'react'
import ReactDOM from 'react-dom'

export default React.createClass({
  componentWillUpdate: function() {
    var node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },
  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight
    }
  },
  render: function(){
    return (
       <div className="messages"> 
        <ul>
          {this.props.myconvo.map((chat,i) => {
            if (/^\/v\//.test(chat.message)) {
              return (
                <li className="you" id={'chat' + i} key={'chat' + i}>
                 {chat.username}: Here's a link so we can video chat 
                 <a className="videoLink" href={chat.message} target="_blank">{chat.message}
                  <i className="fa fa-video-camera" aria-hidden="true"></i>
                 </a>
                </li>
              )
            } else {
              return (
                <li className={chat.from} id={'chat' + i} key={'chat' + i}>
                  {chat.username}:   {chat.message} 
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
})
