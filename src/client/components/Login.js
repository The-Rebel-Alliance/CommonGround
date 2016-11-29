import React from 'react'
import { browserHistory, Link } from 'react-router'

import 'assets/styles/login.css'

export default React.createClass({
  handleSubmit: function(e) {
    e.preventDefault()
    browserHistory.push('/register')
  },
  render: function () {
    return (
      <div id="container">
        <div className="header">
          <h1>Common Ground</h1>
        </div>
          <div className="loginForm">
            <form onSubmit={this.handleSubmit}>
              <div className="login_form">
                <p className="login_header">Login</p>
                <input type="text" id="username" placeholder="First Name" /><br />
                <input type="password" id="password" placeholder="Password" /><br />
                <br />
                <button className="button" type="submit">Login</button>
                <Link to="/register"><button className="button button--state-register">Register</button></Link>
              </div>
            </form>
          </div>
      </div>
    )
  }
})  
