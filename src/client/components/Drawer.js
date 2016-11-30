import React from 'react'
import { browserHistory, Link } from 'react-router'
import styles from 'assets/styles/drawer.css'
import 'font-awesome/css/font-awesome.css'


const drawerContainer = React.createClass ({
  getInitialState: function() {
    return {
      messages: []
    }
  }, 

  componentWillMount: function () {
    getMessages()
    this.unsubscribe = store.subscribe(() => {
      const appState = store.getState()
      this.setState({
        messages: appState.messages
      })
    })
  },

  componentWillUnmount: function() {
    this.unsubscribe()
  },

  render: function() {
    return (
      <drawerView messages={this.state.messages}/>
    )
  }
})
const drawerView = React.createClass ({
  render: function () {
    return (
        <div className='drawer'>
          <span> <i class="fa fa-comments" aria-hidden="true"></i></span>
          <ul className="messages">
          {this.props.messages.map(message => (
              <li key={messages.id}>
                {message.message}
              </li>
            ))}
          </ul>
        </div>
    )
  }
})
