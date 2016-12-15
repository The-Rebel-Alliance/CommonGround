import React from 'react'
import {getProfile, editProfile} from 'api/profile'
import store from 'store'
import 'assets/lib/cloudinary'

import 'assets/styles/editProfile.css'

export default React.createClass({
  getInitialState: function() {
    return {
      id: '',
      firstName: '',
      lastName: '',
      city: '',
      state: '',
      avatar: '',
      politicalAffiliation: '',
      displayTopics: [],
      positionTopics: [],
      topics: []
    }
  },
  componentWillMount: function() {
    getProfile(this.props.params.id)
    this.unsubscribe = store.subscribe(() => {
      const appState = store.getState()
      this.setState({
        id: appState.profile.id || '',
        firstName: appState.profile.first_name || '',
        lastName: appState.profile.last_name || '',
        city: appState.profile.city || '',
        state: appState.profile.state || '',
        avatar: appState.profile.avatar || '',
        politicalAffiliation: appState.profile.political_affiliation || '',
        displayTopics: appState.topics,
        positionTopics: appState.profile.topics,
        mappedTopics: this.mapTheTopics(appState.topics, appState.profile.topics),
        topics: appState.profile.topics.map(topic => topic.id)
      })
      
    })
  },
  componentWillUnmount: function() {
    this.unsubscribe()
  },
  mapTheTopics: function(topicList, userTopics){
    let mapArr = []
    for(let topic of topicList){
      userTopics.forEach(item =>{
        if(topic.name === item.name) mapArr[topic.id] = item.stance;
      })
    }
    return mapArr
  },
  update: function (e) {
    console.log(e.target)
    var val = e.target.value
    var id = e.target.id
    var stateObj = {}
    stateObj[id] = val 
    this.setState(stateObj)
  },
  upload: function(e) {
    e.preventDefault()
    var settings = {cloud_name: 'dxpodvk7x' , upload_preset: 'v9doyprk'} 
    window.cloudinary.openUploadWidget(settings, (error, result)  => {
      console.log(result)
      this.setState({
        avatar: result[0].url
      }) 
    });
  },
  updateTopics: function (e) {
    var id = Number(e.target.id.substr(5))
    
    var topics = this.state.topics

    console.log('topics before if', topics)
    
    if (topics.indexOf(id) === -1) {
      topics.push(id)
      console.log('topics',topics)
    } else {
      topics.splice(topics.indexOf(id), 1)
    }
    this.setState({
      topics: topics
    })
    console.log('end', topics)  
  },

  updateStances: function (e) {
    var mappedTopics = this.state.mappedTopics
    mappedTopics[e.target.id] = e.target.value
    this.setState({mappedTopics: mappedTopics})
    console.log('mappedTopics', mappedTopics)

  },
  handleSubmit: function(e) {
    e.preventDefault()
    var finalArr = []
    this.state.mappedTopics.forEach((stance, key) => {
      var obj = {
        id: key,
        stance: stance 
      }
      finalArr.push(obj)
    })
    console.log('finalArr', finalArr)
   
    editProfile({
      first_name:this.state.firstName,
      last_name:this.state.lastName,
      avatar:this.state.avatar,
      city:this.state.city,
      state:this.state.state,
      political_affiliation:this.state.politicalAffiliation,
      topics: finalArr
    })
  },
  compareTopic: function(topicId) {
    var positions = this.state.positionTopics.map(function(position){
      return position.id
    })
    for (var i = 0; i < positions.length; i += 1) {
      if (positions[i] === topicId) {
        return true
      }
    }
    return false
  },
  render: function () {
    return (
     <div id="container">
          <div className="register_form_edit">
            <form onSubmit={this.handleSubmit}>
              <div className="registerform_container_edit">
                <p className="register_header_edit">Edit Profiile</p>
                <input className="input_field_register_edit" onChange={this.update} value={this.state.firstName} type="text" id="firstName" placeholder="First Name" /><br />
                <input className="input_field_register_edit" onChange={this.update} value={this.state.lastName} type="text" id="lastName" placeholder="Last Name" />
                <input className="input_field_register_edit" id="city" onChange={this.update} value={this.state.city} type="text" id="city" placeholder="City" />
                <select id="state" onChange={this.update} value={this.state.state} className="register_state_select_edit">
                  <option defaultValue="selected">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                <select id ="politicalAffiliation" onChange={this.update} value={this.state.politicalAffiliation} className="register_affilation_select_edit">
                  <option defaultValue="selected">Select Political Affilation</option>
                  <option value="Democrat">Democrat</option>
                  <option value="Republican">Republican</option>
                  <option value="Independent">Independent</option>
                  <option value="Other">Other</option>
                </select> 
                <button onChange={this.update} value={this.state.avatar} type="button" id="avatar" onClick={this.upload}>Upload Avatar</button>
                <button type="submit" className="button button--state-register--register_edit">Submit</button> 
            </div>          
            <div className="select--topic--container_edit">
              <div className="register_topic_select_edit">Edit Topics of Interests:</div>
              {this.state.displayTopics.map((topic,i) => {
                return ( 
                  <div key={'topic'+ i} className="topic_checkbox_container_edit">
                    <label key={'topic' + i} className="labels">
                      <input onChange={this.updateTopics} 
                             id={"topic" + topic.id}
                             className="topic_checkbox_edit" 
                             type="checkbox" 
                             value={topic.id}
                             defaultChecked={this.compareTopic(topic.id)}
                              />
                      {topic.name}
                    </label>
                  </div>
                )
              })}
          </div>
          <div className="topic_table">Topic Positions:</div>
          <div className="topics_container">
          {this.state.displayTopics.map((item,i) => {
            return (
              <div key={item.id} id={"topic" + i} className={"indiv_topic_container" + i}>
                <h3 className="topic_header">{item.name}</h3>
              <textarea id={item.id} onChange={this.updateStances} defaultValue={this.state.mappedTopics[item.id]} />
          </div>
          )
        })}
                
            
        </div>
      </form>
  </div>
</div>
    )
  }
})
//

