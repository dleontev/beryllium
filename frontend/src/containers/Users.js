import React from "react";
import UserCard from '../presentationals/UserCard';
import axios from "axios";
import { Link } from 'react-router-dom';

class Users extends React.Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentWillMount() {
    axios.get('http://localhost:4000/api/users')
      .then(response => {
        this.setState({ users: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
	 
    const users = this.state.users.map((user, index) =>
      <UserCard
	      key = { index }
        first_name = { user.first_name }
        email = { user.email }
      />
    );

    return (
      <div>
        <div className="button is-primary"
          style = {{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px 15px",
          }}
        >
          <Link to="/users/create" style = {{ color: "white" }} >
            Create User
          </Link>
        </div>
		{users}
      </div>
    )
  }
}

export default Users
