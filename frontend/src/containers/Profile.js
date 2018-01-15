import React from "react";
import UserCardExtended from "../presentationals/UserCardExtended";
import axios from "axios";

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
        <div class="level-right">
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
