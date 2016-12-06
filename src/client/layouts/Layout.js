import React from 'react'
import { Link } from 'react-router'


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


