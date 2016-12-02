import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import 'normalize.scss/normalize.scss'


import Login from 'components/Login'
import Register from 'components/Register'
import Drawer from 'components/Drawer'
import Topics_register from 'components/Topics_register'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/drawer" component={Drawer} />
    <Route path="/topics_register" component={Topics_register} />
   </Router>
), document.getElementById('app'))
