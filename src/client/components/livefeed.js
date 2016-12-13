import React from 'react'
import store from 'store'

export default React.createClass({
  getInitialState: function () {
    return {
      liveRooms: []
    }
  },
  componentWillMount: function() {
    this.unsubscribe = store.subscribe(()=>{
      const appState = store.getState()
      this.setState({
        liveRooms: appState.liveRooms
      })
    })
  },
  componentWillUnmount: function () {
    this.unsubscribe()
  },
  render: function (){
    return(
      <div>
        <h2 className="livefeed_header">Live Now</h2>
        <div id="videolink_container">
          {this.state.liveRooms.map((room, i)=>(
            <div key={'live' + room.link} className="video_container">
              <div className="videolink_img1"><img className="videolink_image" src={room.user1.avatar}/></div>
              <div className="videolink_img2"><img className="videolink_image" src={room.user2.avatar}/></div>
              <div className="videolink_name1"><p className="name_videolink">{room.user1.first_name} {room.user1.last_name}</p></div>
              <div className="videolink_name2"><p className="name_videolink">{room.user2.first_name} {room.user2.last_name}</p></div>
              <div className="videolink_video"><a href={room.link} target="_blank"><p className="name_videolink_link"><i className="fa fa-video-camera" aria-hidden="true"></i> Watch Now</p></a></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
})
