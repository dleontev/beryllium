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
        email={user.email}
      />
    ));

    return (
      <div>
        <Link to="/register">
          <button className="button is-link">Create User</button>
        </Link> 
        <br/><br/>
        {users}
      </div>
    );
  }
}

export default Users;
