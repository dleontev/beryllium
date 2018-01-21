import React from "react";
import { Link, Redirect } from "react-router-dom";
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

    api
      .post(`/sessions/`, {
        email: this.state.email,
        entered_password: this.state.entered_password
      })
      .then(response => {
        ///////////////// FAKE AUTHENTICATION ///////////////////
        if (typeof response !== "undefined" && typeof response.data.meta !== "undefined") {
          localStorage.setItem("token", response.data.meta.token);
          this.props.history.push("/account");
        }
        ////////////////////////////////////////////////////////
      });
  }

  render() {
    ///////////////// FOR TESTING ONLY /////////////////////
    if (localStorage.getItem("token") !== null) {
      return <Redirect to="/account" />;
    }
    ////////////////////////////////////////////////////////

    return (
      <div className="container" style={{ width: "40%" }}>
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
                <span className="icon is-medium is-left">
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  value={this.state.entered_password}
                  onChange={this.handlePassword.bind(this)}
                />
                <span className="icon is-medium is-left">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>
            </div>
            <div className="level-right">
              <div className="field is-grouped">
                <div className="control">
                  <Link to="/register">
                    <button className="button is-primary">Register</button>
                  </Link>
                </div>
                <div className="control">
                  <button
                    type="submit"
                    value="Submit"
                    className="button is-link"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
