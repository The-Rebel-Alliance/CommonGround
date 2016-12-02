import React from 'react'
import { browserHistory, Link } from 'react-router'

export default React.createClass({
  render: function(){
    return(
      <div id="textboxContainer">
      <form id="textBox">
        <input type="text" name="textBox" id="inputBox"></input><button>Submit</button>
      </form>
        </div>

    )
  }
})  

