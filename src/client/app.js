import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import 'normalize.scss/normalize.scss'


import Login from 'components/Login'
import Register from 'components/Register'
import Dashboard from 'components/DashboardSearch'
import Profile from 'components/ProfileView'
import Drawer from 'components/Drawer'
import ProfileEdit from 'components/ProfileEdit'



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/editprofile/:id" component={ProfileEdit} />
    <Route path="/drawer" component={Drawer} />
   </Router>

), document.getElementById('app'))
