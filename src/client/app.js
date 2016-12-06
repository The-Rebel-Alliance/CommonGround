import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

//Style Normalize
import 'normalize.scss/normalize.scss'

//Components
import Login from 'components/Login'
import Register from 'components/Register'
// import MessagingContainer from 'components/MessagingView'
// import TextBox from 'components/TextBox'
import Dashboard from 'components/dashboardSearch'
import ProfileView from 'components/ProfileView'
// import Drawer from 'components/Drawer'
import ProfileEdit from 'components/ProfileEdit'
import Profile from 'components/Profile'
import Layout from 'layouts/Layout'


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route component={Layout}>
      <Route path="/dashboard" component={Dashboard} />  
    </Route>
    <Route path="/register" component={Register} />
    <Route path="/profile" component={Profile} />
    <Route path="/profile/:id" component={ProfileView} />
    <Route path="/editprofile" component={ProfileEdit} />
  </Router>

), document.getElementById('app'))

// <Route path="/drawer" component={Drawer} />
// <Route path="/messaging" component={MessagingContainer} />

