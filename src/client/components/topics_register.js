import React from 'react'
import {getTopics} from 'api/topics'
import { browserHistory, Link } from 'react-router'
import store from 'store'
import 'assets/styles/register.css'
import 'assets/lib/cloudinary'

const TopicsRegisterContainer = React.createClass({
    getInitialState: function() {
        return {
            topics: []
        }
    },
    componentWillMount: function() {
        getTopics()
        this.unsubscribe = store.subscribe(() => {
          const appState = store.getState()
          this.setState({
              topics: appState.topics
          })
        })
    },
    componentWillUnmount: function() {
      this.unsubscribe()
    },
    render: function () {
        return (
            <TopicsRegister topics={this.state.topics}  />
        )
    }
})

const TopicsRegister = React.createClass({
    render: function () {
        return (
          <div className="select--topic--container">
                  <div className="register_topic_select">Select Topics of Interests:</div>
            {this.props.topics.map((topic,i) => {
              return( <label key={'topic' + i} className="labels"><input onChange={this.handleChange} className="topic_checkbox" type="checkbox" value={topic.name} />{topic.name}</label>
                )
            })}
          </div>
        )
    }
})


export default TopicsRegisterContainer
