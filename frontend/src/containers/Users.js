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
		console.log(response);
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
        <div className="is-primary is-large"
          style = {{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px 15px",
            background: "#00D1B2"
          }}
        >
          <Link to="/create" style = {{ color: "white" }} >
          Create User
          </Link>
        </div>
		{users}
      </div>
    )
  }
}

export default Users
