import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import 'normalize.scss/normalize.scss'

import Login from 'components/Login'
import Register from 'components/Register'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />
  </Router>
), document.getElementById('app'))
