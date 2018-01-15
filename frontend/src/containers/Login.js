import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      email: ""
    };
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    axios
      .get("http://localhost:4000/api/users/")
      .then(response => {
        this.setState({ user: response.data.data });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div class="box">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <label className="label">Email</label>
            <div class="control has-icons-left">
              <input
                className="input"
                type="text"
                value={this.state.email}
                onChange={this.handleEmail.bind(this)}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-envelope-o" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div class="control has-icons-left">
              <input
                className="input"
                type="text"
                value={this.state.password}
                onChange={this.handlePassword.bind(this)}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-lock" aria-hidden="true" />
              </span>
            </div>
          </div>

          <button type="submit" value="Submit" className="button is-link">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
