import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getTopics} from 'api/topics'
import {searchUsers} from 'api/search'
import store from 'store'

import 'assets/styles/dashboardSearch.css'

const DashboardContainer = React.createClass({
  getInitialState: function(){
    return{
      topics: [],
      profiles: []
    }
  },
  componentWillMount: function(){
    getTopics()
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
        this.setState({
          topics: appState.topics,
          profiles: appState.profiles
      }) 
      console.log(appState.profiles)
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  render: function(){
    return (<CommonDashboard topics={this.state.topics} profiles={this.state.profiles}/>)
    } 
})
const CommonDashboard = React.createClass({
  getInitialState: function() {
    return {
      id:0
    }
  },
  submitHandle: function(e) {
    e.preventDefault()
    searchUsers(this.state.id)
  },
  handleChange: function(e) {
    var value = e.target.value
    console.log(value)
    
    this.setState({
      id:value
    })
  },
  render: function () {
    return(
      <div id="dashboard_container">
        <div className="dashboard_header"></div>
        <form onSubmit={this.submitHandle}>
          <div className="search--topic--container">
            <select onChange={this.handleChange} className="searchbar">
              <option>Select A Topic</option>
                {this.props.topics.map((item,i) => {
                  return(
                      <option id={"item" + item.id} key={'item' + i} value={item.id}>{item.name}</option>
                    )
                })}
            </select>
            <button type="submit" className="searchbutton">Search</button>
          </div>
        </form>
        <ul>
          {this.props.profiles.map((user,i) =>{
            return(
              <li key={'user' + i} id={'user' + user.id} value={user.id}>{user.avatar} {user.firstName} {user.lastName}</li>
              )
          })}
        </ul>
      </div>
    )
  }
})

export default DashboardContainer
