import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

//Style Normalize
import 'normalize.scss/normalize.scss'

//Components
import Login from 'components/Login'
import Register from 'components/Register'
import Drawer from 'components/Drawer'
import Dashboard from 'components/dashboardSearch'
import ProfileView from 'components/ProfileView'
import ProfileEdit from 'components/ProfileEdit'
import Profile from 'components/Profile'


// Layout

import Layout from 'layouts/Layout'



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route component={Layout}>
      <Route path="/drawer" component= {Drawer} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile/:id" component={ProfileView} />
      <Route path="/editprofile" component={ProfileEdit} />
    </Route>
  </Router>

), document.getElementById('app'))



