import React from "react";
import { Link } from "react-router-dom";
import api from "../api/Api";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      entered_password: "",
      email: ""
    };
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({ entered_password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    api.post(`/sessions/`, {
      email: this.state.email,
      entered_password: this.state.entered_password
    });
  }

  render() {
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                value={this.state.email}
                onChange={this.handleEmail.bind(this)}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                value={this.state.entered_password}
                onChange={this.handlePassword.bind(this)}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
            </div>
          </div>
          <button type="submit" value="Submit" className="button is-link">
            Login
          </button>
          <div className="divider" />
          <Link to="/register">
            <button className="button is-primary">Register</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;

// axios({
//   method: "post",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   url: "http://localhost:4000/api/sessions",
//   data: {
//     email: this.state.email,
//     entered_password: this.state.entered_password
//   }
// }).then(response => {
//   console.log(response);
// });
