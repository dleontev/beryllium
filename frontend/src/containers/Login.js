import React from "react";
import { Link, Redirect } from "react-router-dom";
import api from "../api/Api";
import ReactRouterPropTypes from "react-router-prop-types";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      entered_password: "",
      email: "",
      redirectToReferrer: false
    };
  }

  /**
   * Updates the current state when a user inputs something.
   */
  
  handleChange(event) {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value
    }));
  }

  /**
   * Submits the user input data via a post request.
   */

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.email.length === 0) {
      alert("Please, enter a valid email.");
      return;
    } else if (this.state.entered_password.length === 0) {
      alert("Please, enter a password.");
      return;
    }

    api
      .post(`/sessions/`, {
        email: this.state.email,
        entered_password: this.state.entered_password
      })
      .then(response => {
        if (
          typeof response !== "undefined" &&
          typeof response.data.meta !== "undefined"
        ) {
          localStorage.setItem("token", response.data.meta.token);
          this.setState({ redirectToReferrer: true });
        }
      });
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/account" }
    };

    if (this.state.redirectToReferrer || localStorage.getItem("token")) {
      return <Redirect to={from} />;
    }

    return (
      <div
        className="box"
        style={{
          maxWidth: "500px",
          padding: "3rem 4rem",
          margin: "2rem auto"
        }}
      >
        <h2
          className="subtitle"
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          Login to Beryllium
        </h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Email"
                name="email"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="icon is-medium is-left">
                <i className="fa fa-envelope-o" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="entered_password"
                onChange={this.handleChange.bind(this)}
                required
              />
              <span className="icon is-medium is-left">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="levels">
            <div className="control">
              <button
                type="submit"
                value="Submit"
                className="button is-link  is-fullwidth"
              >
                Login
              </button>
            </div>
            <hr style={{ margin: "1rem 0" }} />
            <div className="control">
              <Link to="/register">
                <button className="button i is-fullwidth">
                  Create a new account
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  location: ReactRouterPropTypes.location.isRequired
};

export default Login;
