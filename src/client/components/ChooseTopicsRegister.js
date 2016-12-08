import React from 'react'
import {getTopics} from 'api/topics'
import store from 'store'
import {editTopics, getProfile} from 'api/profile'

export default React.createClass({
  getInitialState: function() {
    return {
      displayTopics: [],
      submitTopics: []
    }
  },
  componentWillMount: function() {
    getTopics()
    getProfile(this.props.params.id)
      this.unsubscribe = store.subscribe(() => {
        const appState = store.getState()
        this.setState({
          displayTopics: appState.topics
      })
    })
  },
  updateTopics: function (e) {
    var id = Number(e.target.id.substr(5))
    var topics = this.state.submitTopics
    if (topics.indexOf(id) === -1) {
      topics.push(id)
    } else {
      topics.splice(topics.indexOf(id), 1)
    }
    this.setState({
      submitTopics: topics
    })
    console.log(topics)
  },
  handleSubmitTopics: function(e) {
    e.preventDefault()
    editTopics({
      topics:this.state.submitTopics
    })
  },
  render: function () {
    return (
      <div>
        <form onSubmit={this.handleSubmitTopics}>
        <div className="select--topic--container">
              <div className="register_topic_select">Edit Topics of Interests:</div>
              {this.state.displayTopics.map((topic,i) => {
                return ( 
                  <label key={'topic' + i} className="labels">
                    <input onChange={this.updateTopics} 
                           id={"topic" + topic.id}
                           className="topic_checkbox" 
                           type="checkbox" 
                           value={topic.id} />
                    {topic.name}
                  </label>
                )
              })}
          </div>
          <button type="submit" className="button button--state-register--register">Register</button>
        </form>
      </div>
    )
  }
})

