import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

//Style Normalize
import 'normalize.scss/normalize.scss'

//Components
import Login from 'components/Login'
import Register from 'components/Register'
import MessagingContainer from 'components/MessagingContainer'
import TextBox from 'components/TextBox'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/messaging" component={MessagingContainer} />
    <Route path="/messaging" component={TextBox} />
  </Router>
), document.getElementById('app'))
