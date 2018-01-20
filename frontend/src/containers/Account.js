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
      this.setState({ user: response.data.data });
    });

    api.get("/courses/user/all").then(response => {
      this.setState({ courses: response.data.data });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="level-right">
          <button className="button is-link">Edit Profile</button>
        </div>
        <br />
        <div className="box">
          <UserProfileCard
            id={this.state.user.id}
            first_name={this.state.user.first_name}
            last_name={this.state.user.last_name}
            middle_name={this.state.user.middle_name}
            email={this.state.user.email}
            courses={this.state.courses}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
