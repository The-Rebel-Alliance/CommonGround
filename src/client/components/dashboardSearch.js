import React from 'react'
import {Link, browserHistory} from 'react-router'
import {getTopics} from 'api/topics'
import {searchUsers} from 'api/search'
import store from 'store'
import 'font-awesome/css/font-awesome.css'
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
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  render: function(){
    return (
      <CommonDashboard topics={this.state.topics} profiles={this.state.profiles}/>
    )
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
    this.setState({
      id:value
    })
  },
  render: function () {
    return(
      <div>
        <div id="dashboard_container">
          <form onSubmit={this.submitHandle}>
            <div className="search--topic--container">
              <select onChange={this.handleChange} className="searchbar">
                <option>Search User's by Topic</option>
                  {this.props.topics.map((item,i) => {
                    return(
                      <option id={"item" + item.id} key={'item' + i} value={item.id}>{item.name}</option>
                    )
                  })}
              </select>
              <button type="submit" className="searchbutton">Search</button>
            </div>
          </form>
          <div className="usersSearch">
            {this.props.profiles.map((user,i) =>{
              return(
                <ul className="user_li" key={'user' + i}>
                <Link className="profile_link" to={`/profile/${user.id}`}>
                  <li className="user_list"  id={'user' + user.id} value={user.id}><img className="user_avatar" src={user.avatar}/><p className="userinfo">{user.first_name}&nbsp;{user.last_name}</p><p className="userinfo">Political Affiliation:&nbsp;{user.political_affiliation}</p></li>
                </Link> </ul>
                )
            })}
          </div>
        </div>
        <h2 className="livefeed_header">Current Live Video Feeds</h2>
        <div id="videolink_container">
        <div className="video_container">
         <div className="videolink_img1"><img className="videolink_image" src="https://images-na.ssl-images-amazon.com/images/M/MV5BNzEzMTI2NjEyNF5BMl5BanBnXkFtZTcwNTA0OTE4OA@@._V1_UY1200_CR84,0,630,1200_AL_.jpg"/></div>
         <div className="videolink_img2"><img className="videolink_image" src="http://media4.s-nbcnews.com/j/newscms/2016_39/1161485/highest-paid-tv-actors-galecki-inline-01-160927_3a619f58379ab35da2084823d293635c.today-inline-large.jpg"/></div>
         <div className="videolink_name1"><p className="name_videolink">Ryan Lee</p></div>
         <div className="videolink_name2"><p className="name_videolink">Dustin Rudy</p></div>
         <div className="videolink_video"><p className="name_videolink_link"><i className="fa fa-video-camera" aria-hidden="true"></i> Link goes here</p></div>
         </div>
        </div>
      </div>
    )
  }
})

export default DashboardContainer
