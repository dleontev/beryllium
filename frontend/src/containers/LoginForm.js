import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      success: "NIL"
    };
  }

  handleSubmit(e){
    e.preventDefault();
    axios({
      method:'post',
      url:'http://localhost:4000/api/users/validate/',
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }
    })
      .then(function(response) {
      console.log(response);
    });
  }
  handleEmail(e){
    this.setState({
      email: e.target.value
    });
    console.log(this.state.email);
  }
  handlePassword(e){
    this.setState({
      password: e.target.value
    });
    console.log(this.state.password);
  }
  render() {
    return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          Email<input type="text" name="email" onChange={this.handleEmail.bind(this)}/>
          Password<input type="text" name="password" onChange={this.handlePassword.bind(this)}/>
          <button type="submit"> Submit </button>
        </form>
    )
  }
}

export default LoginForm
