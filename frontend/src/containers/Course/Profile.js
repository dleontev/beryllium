import React from "react";
import UserProfileCard from "../../components/UserProfileCard";
import api from "../../api/Api";

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
      return "No data found.";
    }

    return (
      <UserProfileCard
        id={this.stateuser.id}
        first_name={this.stateuser.first_name}
        last_name={this.stateuser.last_name}
        middle_name={this.stateuser.middle_name}
        email={this.stateuser.email}
      />
    );
  }

  render() {
    return <div className="box">{this.getUserCard()}</div>;
  }
}

export default Profile;
