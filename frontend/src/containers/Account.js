import React from "react";
import UserProfileCard from "../components/UserProfileCard";
import api from "../api/Api";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: [], courses: [] };
  }

  componentWillMount() {
    api.get("/account").then(response => {
      if (typeof response !== "undefined") {
        this.setState({ user: response.data.data });
      }
    });

    api.get("/courses/user/all").then(response => {
      if (typeof response !== "undefined") {
        this.setState({ courses: response.data.data });
      }
    });
  }

  getUserCard() {
    if (this.state.user === null) {
      return;
    }

    return (
      <UserProfileCard
        id={this.state.user.id}
        first_name={this.state.user.first_name}
        last_name={this.state.user.last_name}
        middle_name={this.state.user.middle_name}
        email={this.state.user.email}
        courses={this.state.courses}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <div className="level-right">
          <button className="button is-link">Edit Profile</button>
        </div>
        <br />
        <div className="box">{this.getUserCard()}</div>
      </div>
    );
  }
}

export default Profile;
