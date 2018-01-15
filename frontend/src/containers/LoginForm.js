import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: ''
    };
  }

  handleEmail(event) {
    this.setState({ email: event.target.value })
  }
  
  handlePassword(event) {
    this.setState({ password: event.target.value })
  }
  
  componentWillMount() {
    axios.get('http://localhost:4000/api/users')
      .then(response => {
        this.setState({ users: response.data.data });
		console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  handleSubmit (event) {

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

export default LoginForm
