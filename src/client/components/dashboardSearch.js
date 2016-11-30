import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getTopics} from 'api/topics'
import store from 'store'

import 'assets/styles/dashboardSearch.css'

const DashboardContainer = React.createClass({
  getInitialState: function(){
    return{
      topics: []
    }
  },
  componentWillMount: function(){
        
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
        this.setState({
          topics: appState.topics
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
        <div className="dashboard_header"></div>
     
          <div className="select--topic--container">
            <select>
              <option>Search Topics</option>
                {this.props.topics.map(item => {
                  return(
                      <option>{item.topics}</option>
                    )
                })}
            </select>
            <button>Search</button>
          </div>
                  

     </div>
      )
  }
})

export default DashboardContainer
