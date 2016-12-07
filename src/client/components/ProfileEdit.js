import React from 'react'
import {getProfile, editProfile} from 'api/profile'
import store from 'store'
import {getTopics} from 'api/topics'

import 'assets/styles/editProfile.css'

export default React.createClass({
  getInitialState: function() {
    return {
        id: '',
        first_name: '',
        last_name: '',
        city: '',
        state: '',
        avatar: '',
        politicalAffiliation: '',
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
            id: appState.profile.id,
            first_name: appState.profile.firstName,
            last_name: appState.profile.lastName,
            city: appState.profile.city,
            state: appState.profile.state,
            avatar: appState.profile.avatar,
            political_affiliation: appState.profile.politicalAffiliation,
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
  update: function (e) {
    var val = e.target.id
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
  render: function () {
    return (
     <div id="container">
          <div className="register_form">
            <form onSubmit={this.handleSubmit}>
              <div className="registerform_container">
                <p className="register_header">Edit Profile</p>
                <input onChange={this.update} value={this.state.first_name} type="text" id="firstName" placeholder="First Name" /><br />
                <input onChange={this.update} value={this.state.last_name} type="text" id="lastName" placeholder="Last Name" />
                <input id="city" onChange={this.update} type="text" id="city" placeholder="City" />
                <select id="state" onChange={this.update} className="register_state_select">
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
                <select id ="politicalAffiliation" onChange={this.update} className="register_affilation_select">
                  <option defaultValue="selected">Select Political Affilation</option>
                  <option value="Democrat">Democrat</option>
                  <option value="Republican">Republican</option>
                  <option value="Independent">Independent</option>
                  <option value="Other">Other</option>
                </select> 
                <button onChange={this.update} type="button" id="avatar" onClick={this.upload}>Upload Avatar</button>
            </div>
            <div className="topics_container">
          {this.props.displayTopics.map(item => {
            return (
              <div key={item.id} className="indiv_topic_container">
                <h3 className="topic_header">{item.name}</h3>
                <textarea className="topic_stance">{item.stance}</textarea>
              </div>
            )
          })}
        </div>          
            <button type="submit" className="button button--state-register--register">Submit</button>
      </form>
  </div>
</div>
    )
  }
})
