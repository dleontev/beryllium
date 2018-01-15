import React from "react";
import UserCardExtended from "../presentationals/UserCardExtended";
import axios from "axios";
import { Link, Router } from "react-router-dom";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: [] };
  }

  componentWillMount() {
    axios
      .get("http://localhost:4000/api/users/" + this.props.match.params.id)
      .then(response => {
        this.setState({ user: response.data.data });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const user = this.state.user;

    return (
      <div>
        <button className="button is-link">Edit Profile</button>
        <UserCardExtended
          id={user.id}
          first_name={user.first_name}
          last_name={user.last_name}
          middle_name={user.middle_name}
          email={user.email}
        />
      </div>
    );
  }
}

export default Profile;
