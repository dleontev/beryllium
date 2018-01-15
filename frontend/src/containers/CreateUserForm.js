import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
	  first_name: '',
      middle_name: '',
      last_name: '',
      time_zone: '',
      password: '',
      email: ''
    };
  }

  handleEmail(event) {
    this.setState({ email: event.target.value })
  }
  
  handleFirstName(event) {
    this.setState({ first_name: event.target.value })
  }

  handleMiddleName(event) {
    this.setState({ middle_name: event.target.value })
  }

  handleLastName(event) {
    this.setState({ last_name: event.target.value })
  }

  handleTimeZone(event) {
    this.setState({ time_zone: event.target.value })
  }

  handlePassword(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault();
    axios({
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      url: 'http://localhost:4000/api/users',
      data: {
        users: {
		  email: this.state.email,
          first_name: this.state.first_name,
          middle_name: this.state.middle_name,
		  last_name: this.state.last_name,
          time_zone: this.state.time_zone,
          password: this.state.password,
        }
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value = {this.state.email}
              onChange = {this.handleEmail.bind(this)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">First_Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value = {this.state.first_name}
              onChange = {this.handleFirstName.bind(this)}
            />
          </div>
        </div>

		<div className="field">
          <label className="label">Middle_Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value = {this.state.middle_name}
              onChange = {this.handleMiddleName.bind(this)}
            />
          </div>
        </div>
		
        <div className="field">
          <label className="label">Last_Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value = {this.state.last_name}
              onChange = {this.handleLastName.bind(this)}
            />
          </div>
        </div>

		<div className="field">
          <label className="label">Time Zone</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value = {this.state.time_zone}
              onChange = {this.handleTimeZone.bind(this)}
            />
          </div>
        </div>
		
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value = {this.state.password}
              onChange = {this.handlePassword.bind(this)}
            />
          </div>
        </div>

        <button
          type="submit"
          value="Submit"
          className="button is-primary"
        >
        Submit
        </button>

      </form>
    )
  }
}

export default Form
