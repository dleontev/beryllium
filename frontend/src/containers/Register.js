import React from "react";
import api from "../api/Api";
import { Link } from "react-router-dom";
//import aws from "../api/Aws";

class CreateUser extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      password: "",
      email: "",
      filedata: "",
      filename: ""
    };
  }

  /**
   * Updates the current state when a user makes changes to their input.
   */

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value
    }));
  }

  /**
   * Stores the given file name and file data in the current state.
   */

  handleFilename(event) {
    var files = event.target.files;

    // Only process image files.
    if (!files[0].type.match("image.*")) {
      return;
    }

    this.setState({ filename: files[0].name, filedata: event.target.files });
  }

  /**
   * Submits the post request to create a new user,
   */
  
  handleSubmit(event) {
    event.preventDefault();

    // const response = aws.upload("test1", this.state.filedata);
    // console.log(response);

    api.post(`/users/`, {
      email: this.state.email.toLowerCase(),
      name: this.state.name,
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
                name="email"
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                placeholder="Name"
                className="input"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                placeholder="Password"
                className="input"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
              />
            </div>
          </div>

          <div className="field">
            <div className="file has-name is-fullwidth">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="resume"
                  onChange={this.handleFilename.bind(this)}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fa fa-upload" />
                  </span>
                  <span className="file-label">Choose a file…</span>
                </span>
                <span className="file-name" placeholder="Test">
                  {this.state.filename}
                </span>
              </label>
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
