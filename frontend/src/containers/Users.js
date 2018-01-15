import React from "react";
import UserCard from "../presentationals/UserCard";
import axios from "axios";
import { Link } from "react-router-dom";

class Users extends React.Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentWillMount() {
    axios
      .get("http://localhost:4000/api/users")
      .then(response => {
        this.setState({ users: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const users = this.state.users.map((user, index) => (
      <UserCard
        key={index}
        id={user.id}
        first_name={user.first_name}
        last_name={user.last_name}
        middle_name={user.middle_name}
        time_zone={user.time_zone}
        email={user.email}
      />
    ));

    return (
      <div>
        <div class="level-right">
          <Link to="/register">
            <button className="button is-link">Create User</button>
          </Link>
        </div>
        <br />
        <div className="box">
          <table class="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Timezone</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>{users}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;
