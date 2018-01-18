import React from "react";
import UserTableCard from "../components/UserTableCard";
import api from "../api/Api";

class Users extends React.Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentWillMount() {
    api.get('/users/').then(response => {
      this.setState({ users: response.data.data });
    });
  }

  render() {
    const users = this.state.users.map((user, index) => (
      <UserTableCard
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
        <br />
        <div className="box">
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
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
