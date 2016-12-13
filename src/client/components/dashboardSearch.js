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
        <h2 className="livefeed_header">Live Now</h2>
        <div id="videolink_container">
          <div className="video_container">
           <div className="videolink_img1"><img className="videolink_image" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAdaAAAAJGY4ZGZkNTgzLWZmNjYtNGE2MC05ZmI0LWVlYTY0NDliOWM4Yg.jpg"/></div>
           <div className="videolink_img2"><img className="videolink_image" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAj6AAAAJDU5OTg3ODgzLTNmNmItNDU2Yy1hYThlLTEwMzkwY2Q0Yzg0MQ.jpg"/></div>
           <div className="videolink_name1"><p className="name_videolink">Ryan Lee</p></div>
           <div className="videolink_name2"><p className="name_videolink">Dustin Rudy</p></div>
           <div className="videolink_video"><p className="name_videolink_link"><i className="fa fa-video-camera" aria-hidden="true"></i> Link goes here</p></div>
           </div>
          <div className="video_container">
           <div className="videolink_img1"><img className="videolink_image" src="https://media.licdn.com/media/AAEAAQAAAAAAAAmDAAAAJDU0YTA1M2MwLTFmZTQtNGI0NC1iZDlhLWExZTdhOTY1NmY1YQ.jpg"/></div>
           <div className="videolink_img2"><img className="videolink_image" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAfpAAAAJDJjYjIzY2VmLTJjMmQtNDJlMS04N2MxLTVhMGVkOTFmMDkzNg.jpg"/></div>
           <div className="videolink_name1"><p className="name_videolink">Tim Lee</p></div>
           <div className="videolink_name2"><p className="name_videolink">Jason Shabo</p></div>
           <div className="videolink_video"><p className="name_videolink_link"><i className="fa fa-video-camera" aria-hidden="true"></i> Link goes here</p></div>
           </div>
           <div className="video_container">
           <div className="videolink_img1"><img className="videolink_image" src="https://media.licdn.com/media/p/2/000/1c7/38b/2679730.jpg"/></div>
           <div className="videolink_img2"><img className="videolink_image" src="https://tiy-site-assets.s3.amazonaws.com/staff-images/mike-sweeney.jpg"/></div>
           <div className="videolink_name1"><p className="name_videolink">Carrie Smidt</p></div>
           <div className="videolink_name2"><p className="name_videolink">Mike Sweeney</p></div>
           <div className="videolink_video"><p className="name_videolink_link"><i className="fa fa-video-camera" aria-hidden="true"></i> Link goes here</p></div>
           </div>
           <div className="video_container">
           <div className="videolink_img1"><img className="videolink_image" src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAN5AAAAJGY0NzRlZjE3LTQ1ZjItNDIzNi05NzZiLWY2ZmM2YjZiOTc4Mw.jpg"/></div>
           <div className="videolink_img2"><img className="videolink_image" src="https://d1qb2nb5cznatu.cloudfront.net/users/502399-large?1405700734"/></div>
           <div className="videolink_name1"><p className="name_videolink">Gabe Shepard</p></div>
           <div className="videolink_name2"><p className="name_videolink">Jeff Newburn</p></div>
           <div className="videolink_video"><p className="name_videolink_link"><i className="fa fa-video-camera" aria-hidden="true"></i> Link goes here</p></div>
           </div>
        </div>
      </div>
    )
  }
})

export default DashboardContainer
