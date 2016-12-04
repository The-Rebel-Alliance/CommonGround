import React from 'react'
import { Link } from 'react-router'

// import dashboardSearch from "/assets/styles/dashboardSearch"
// import drawer from "/assets/styles/drawer"
// import login from "/assets/styles/login"
// import MessagingContainer from "/assets/styles/MessagingContainer"
// import profileview from "/assets/styles/profileview"
// import register from "/assets/styles/register"


import Drawer from 'components/Drawer'

export default React.createClass({
  render: function () {
    return (
      <div className="app">
       
        <main> 
          <Drawer/>
          {this.props.children}
        </main>
      </div>
    )
  }
})
