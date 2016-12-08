import React from 'react'
import { browserHistory, Link } from 'react-router'
import { login } from 'api/users'


import 'assets/styles/AboutCG.css'

const AboutCG = React.createClass({
    render: function(){
      return(
          <div id="aboutUScontainer">
            <p> So, Common Ground is a platfrom created to bring two people with different political or social views, together, to meet "Common Ground". Some key features included are Peer to Peer video chat, E-Mail style messaging, searching for users based on political and social views and your own political profile. 
            </p>
          </div>

    )
  }
})

export default AboutCG
