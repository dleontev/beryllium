import React from "react";
import api from "../api/Api";
import { Link } from "react-router-dom";

class CreateUser extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      middle_name: "",
      last_name: "",
      time_zone: "",
      password: "",
      email: ""
    };
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleFirstName(event) {
    this.setState({ first_name: event.target.value });
  }

  handleMiddleName(event) {
    this.setState({ middle_name: event.target.value });
  }

  handleLastName(event) {
    this.setState({ last_name: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    api.post(`/users/`, {
      email: this.state.email,
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      password: this.state.password
    });
  }

  render() {
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
          Create a new account
        </h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                placeholder="Email"
                type="text"
                value={this.state.email}
                onChange={this.handleEmail.bind(this)}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                placeholder="First Name"
                className="input"
                type="text"
                value={this.state.first_name}
                onChange={this.handleFirstName.bind(this)}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                placeholder="Middle Name"
                className="input"
                type="text"
                value={this.state.middle_name}
                onChange={this.handleMiddleName.bind(this)}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                placeholder="Last Name"
                className="input"
                type="text"
                value={this.state.last_name}
                onChange={this.handleLastName.bind(this)}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                placeholder="Password"
                className="input"
                type="password"
                value={this.state.password}
                onChange={this.handlePassword.bind(this)}
              />
            </div>
          </div>

          <div className="levels">
            <div className="control">
              <button
                type="submit"
                value="Submit"
                className="button is-link is-fullwidth"
              >
                Sign up
              </button>
            </div>
            <hr style={{ margin: "1rem 0" }} />
            <div className="control">
              <Link to="/login">
                <button className="button is-fullwidth">
                  Login to your account
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
