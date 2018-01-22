import React from "react";
import UserProfileCard from "../../components/UserProfileCard";
import api from "../../api/Api";
import profile_image from "../../images/blank-profile.png";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: [] };
  }

  componentWillMount() {
    api.get("/users/" + this.props.match.params.user_id).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ user: response.data.data });
      }
    });
  }

  getUserCard() {
    if (this.state.user.length === 0) {
      return "No profile data found.";
    }

    return (
      <UserProfileCard
        id={this.state.user.id}
        profile_image={profile_image}
        first_name={this.state.user.first_name}
        last_name={this.state.user.last_name}
        middle_name={this.state.user.middle_name}
        email={this.state.user.email}
        courses={<li>Enrollment data is unavailable.</li>}
      />
    );
  }

  render() {
    return this.getUserCard();
  }
}

export default Profile;
