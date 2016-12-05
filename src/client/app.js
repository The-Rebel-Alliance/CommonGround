import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

//Style Normalize
import 'normalize.scss/normalize.scss'

//Components
import Login from 'components/Login'
import Register from 'components/Register'
import Dashboard from 'components/DashboardSearch'
import Profile from 'components/ProfileView'
import Layout from 'layouts/Layout'


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />


    
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/profile/:id" component={Profile} />
    </Router>



), document.getElementById('app'))
//<Route path="/drawer" component={Drawer} />
//<Route path="/messaging" component={MessagingContainer}/>
