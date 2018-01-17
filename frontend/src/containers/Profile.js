import React from "react";
import UserCardExtended from "../components/UserCardExtended";
import api from "../api/Api";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: [] };
  }

  componentWillMount() {
    api.get("/users/" + this.props.match.params.id).then(response => {
      this.setState({ user: response.data.data });
    });
  }

  render() {
    const user = this.state.user;

    return (
      <div>
        <div className="level-right">
          <button className="button is-link">Edit Profile</button>
        </div>
        <br />
        <div className="box">
          <UserCardExtended
            id={user.id}
            first_name={user.first_name}
            last_name={user.last_name}
            middle_name={user.middle_name}
            email={user.email}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
