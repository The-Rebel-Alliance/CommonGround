import React from 'react'
import { browserHistory, Link } from 'react-router'
import store from 'store'
import 'assets/styles/register.css'
import {addUser} from 'api/data'

export default React.createClass({
  getIntialState: function() {
    return {
      first_name: "",
      last_name: "",
      password: "",
      avatar: "",
      state: "",
      political_affilation: "",
      topics: []
    }
  },
  handleSubmit: function() {
   var obj = {
        first_name: appState.first_name,
        last_name: appState.last_name,
        password: appState.password,
        avatar: appState.photo_avatar,
        city: appState.city,
        state: appState.state,
        political_affilation: appState.political_affilation,
        topics: appState.topics
  }
  addUser(obj)
},

  render: function () {
    return (
      <div id="container">
        <div className="header">
          <h1>Common Ground</h1>
        </div>
          <div className="register_form">
            <form onSubmit={this.handleSubmit}>
              <div className="registerform_container">
                <p className="register_header">Register</p>
                <input type="text" id="username" placeholder="Username" /><br />
                <input type="text" id="firstname" placeholder="First Name" /><br />
                <input type="text" id="lastname" placeholder="Last Name" />
                <input type="password" id="password" placeholder="Create Password" /><br />
                <input name="file" type="file" className="cloudinary-fileupload" data-cloudinary-field="image_id" data-form-data=" ... html-escaped JSON data ... "/>
                <select className="register_state_select">
                  <option selected="selected">Select State</option>
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
                <select className="register_affilation_select">
                  <option selected="selected">Select Political Affilation</option>
                  <option value="D">Democrat</option>
                  <option value="R">Republican</option>
                  <option value="I">Independent</option>
                </select> 
            </div>
          <div className="select--topic--container">
                  <div className="register_topic_select">Select Topics of Interests:</div>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Abortion" />Abortion</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Election" />Election</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Foreign Policy"/>Foreign Policy</label> 
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Drug Policy"/>Drug Policy</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Gun Control"/>Gun Control</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Race Relations"/>Race Relations</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="LGBT Rights"/>LGBT Rights</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Immigration"/>Immigration</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Environmental Issues"/>Environmental Issues</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Economic Issues"/>Economic Issues</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Healthcare"/>Healthcare</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Women's Issues"/>Women's Issues</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Income Inequality"/>Income Inequality</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Taxes"/>Taxes</label>
                   <label className="labels"><input className="topic_checkbox" type="checkbox" value="Death Penalty"/>Death Penalty</label>
            </div>
                <Link to="/dashboard/"><button className="button button--state-register--register">Register</button></Link>
          
      </form>
  </div>
</div>
    )
  }
})  
