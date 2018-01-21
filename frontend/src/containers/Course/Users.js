import React from "react";
import api from "../../api/Api";
import UserTableCard from "../../components/UserTableCard";

class Users extends React.Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentWillMount() {
    api.get("/users/sections/" + this.props.match.params.id).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ users: response.data.data });
      }
    });
  }

  getUsersTable() {
    if (this.state.users.length === 0) {
      return "No users found.";
    }

    return (
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Section</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{this.getCourseUsers()}</tbody>
      </table>
    );
  }

  getCourseUsers() {
    return this.state.users.map((user, index) => (
      <UserTableCard
        key={index}
        name={user.first_name + " " + user.middle_name + " " + user.last_name}
        course_code={user.course_code}
        section_name={user.section_name}
        role_name={user.role_name}
      />
    ));
  }

  render() {
    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">People</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end" />
        </nav>

        <div>{this.getUsersTable()}</div>
      </div>
    );
  }
}

export default Users;
