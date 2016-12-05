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
import Dashboard from 'components/dashboardSearch'
import ProfileView from 'components/ProfileView'
import Drawer from 'components/Drawer'
import ProfileEdit from 'components/ProfileEdit'
import Profile from 'components/Profile'



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/messaging" component={MessagingContainer} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/profile" component={Profile} />
    <Route path="/profile/:id" component={ProfileView} />
    <Route path="/editprofile" component={ProfileEdit} />
    <Route path="/drawer" component={Drawer} />
  </Router>
), document.getElementById('app'))
