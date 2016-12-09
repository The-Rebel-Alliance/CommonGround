import React from 'react'
import { browserHistory, Link } from 'react-router'
import 'assets/styles/register.css'
import 'assets/lib/cloudinary'
import {createUser} from 'api/users'
import store from 'store'
import Logo from 'assets/images/cg-logo.png'
import {getTopics} from 'api/topics'

export default React.createClass({
  getInitialState: function() {
    return {
      username: "", 
      password: "",
      firstName: "", 
      lastName: "", 
      avatar: "", 
      city: "", 
      state: "", 
      politicalAffiliation: "",
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
  update: function(e){

        var val = e.target.value
        console.log(val)
        var id = e.target.id
        var stateObj = {}
        stateObj[id] = val
        this.setState(stateObj)
    },

  handleSubmit: function(e) {
    e.preventDefault()
    createUser({
      username:this.state.username,
      password:this.state.password,
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      avatar:this.state.avatar,
      city:this.state.city,
      state:this.state.state,
      politicalAffiliation:this.state.politicalAffiliation,
      topics: this.state.submitTopics
    })
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
  render: function () {
    return (
      <div id="container">
        <div className="header">
          <h1 className="logo_h1"><img className="logo_cg" src={Logo}/></h1>
        </div>
          <div className="register_form">
            <form onSubmit={this.handleSubmit}>
              <div className="registerform_container">
                <p className="register_header">Register</p>
                <input className="input_field_register" onChange={this.update} type="text" id="username" placeholder="Username" /><br />
                <input className="input_field_register" onChange={this.update} type="password" id="password" placeholder="Create Password" /><br />
                <input className="input_field_register" onChange={this.update} type="text" id="firstName" placeholder="First Name" /><br />
                <input className="input_field_register" onChange={this.update} type="text" id="lastName" placeholder="Last Name" />
                <input className="input_field_register" id="city" onChange={this.update} type="text" id="city" placeholder="City" />
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
                  <option value="Interests">Independent</option>
                  <option value="Other">Other</option>
                </select> 
                <button onChange={this.update} type="button" id="avatar" onClick={this.upload}>Upload Avatar</button>
                <button type="submit" className="button button--state-register--register">Register</button> 
            </div>          
            <div className="select--topic--container">
              <div className="register_topic_select">Edit Topics of Interests:</div>
              {this.state.displayTopics.map((topic,i) => {
                return ( 
                <div key={'topic'+ i} className="topic_checkbox_container">
                  <label key={'topic' + i} className="labels">
                    <input onChange={this.updateTopics} 
                           id={"topic" + topic.id}
                           className="topic_checkbox" 
                           type="checkbox" 
                           value={topic.id} />
                    {topic.name}
                  </label>
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
