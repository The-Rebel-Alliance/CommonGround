import React from 'react'
import {getTopics} from 'api/topics'
import store from 'store'
import 'assets/styles/editProfile.css'

const EditTopicsContainer = React.createClass({
  getInitialState: function() {
    return {
      displayTopics: [],
      submitTopics: []
    }
  },
  componentWillMount: function() {
    getTopics()
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
  },
  render: function () {
    return (
      <EditTopics topics={this.state.displayTopics} />
    )
  }
})

const EditTopics = React.createClass({
  render: function () {
    return (
      <div>
        <div className="edit_stances_header">Edit and Add Stances</div>
            <div className="topic_container_edit">
              {this.state.topics.map(item => {
                return (
                  <div key={item.id} className="indiv_topic_container_edit">
                    <label className="topic_header_edit">{item.name}<input className="checkbox_topic" type="checkbox"/></label>
                    <textarea className="topic_stance_edit">{item.stance}</textarea>
                  </div>
                )
              })}
            </div>
        </div>
    )
  }
})


export default EditTopicsContainer
