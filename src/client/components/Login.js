import React from 'react'
import { browserHistory, Link } from 'react-router'
import { login } from 'api/users'

import 'assets/styles/login.css'

export default React.createClass({
  getInitialState: function () {
    return {
      errorMsg: '',
      username: '',
      password: ''
    }
  },
  handleChange: function(e) {
    var id = e.target.id
    var val = e.target.value
    var obj = {}
    obj[id] = val
    this.setState(obj)
  },
  handleSubmit: function(e) {
    e.preventDefault()
    login(this.state.username, this.state.password).catch(err => {
      this.setState ({
        errorMsg: 'Invalid username or password'
      })
    })
    
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
                <input onChange={this.handleChange} type="text" id="username" placeholder="Username" /><br />
                <input onChange={this.handleChange} type="password" id="password" placeholder="Password" /><br />
                <br />
                <p className="error">{this.state.errorMsg}</p>
                <button className="button" type="submit">Login</button>
              </div>
            </form>
            <Link to="/register" className="button button--state-register">Register</Link>
          </div>
      </div>
    )
  }
})  
