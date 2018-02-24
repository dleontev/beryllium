import React from "react";
import UserProfileCard from "../../components/UserProfileCard";
import api from "../../api/Api";
import profile_image from "../../images/blank-profile.png";
import ReactRouterPropTypes from "react-router-prop-types";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: null };
  }

  componentWillMount() {
    api.get(`/users/${this.props.match.params.user_id}`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ user: response.data.data });
      }
    });
  }

  getUserCard() {
    if (!this.state.user) return <div className="loading" />;

    if (this.state.user.length === 0) return "No profile data found.";

    return (
      <UserProfileCard
        id={this.state.user.id}
        profile_image={profile_image}
        name={this.state.user.name}
        email={this.state.user.email}
        courses={<li>Enrollment data is unavailable.</li>}
      />
    );
  }

  render() {
    return this.getUserCard();
  }
}

Profile.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
};

export default Profile;
