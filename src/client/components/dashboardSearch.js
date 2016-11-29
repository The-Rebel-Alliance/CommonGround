import React from 'react'
import {Link, browserHistory} from 'react-router'

import store from 'store'

import 'assets/styles/dashboardSearch.css'

const DashboardContainer = React.createClass({
  getInitialState: function(){
    return{
      
    }
  },
  componentWillMount: function(){
    
        
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
        this.setState({
          
      }) 
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  
  render: function(){
    return (<CommonDashboard {...this.state}/>)
    } 
})
const CommonDashboard = React.createClass({
  render: function (){
    return(
     <div id="dashboard_container">
        
     </div>
      )
  }
})

export default DashboardContainer
