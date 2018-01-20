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
      this.setState({ users: response.data.data });
    });
  }

  render() {
    const users = this.state.users.map((user, index) => (
      <UserTableCard
        key={index}
        first_name={user.first_name}
        last_name={user.last_name}
        middle_name={user.middle_name}
        course_code={user.course_code}
        section_name={user.section_name}
        role_name={user.role_name}
      />
    ));

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">People</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end" />
        </nav>

        <div>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Section</th>
                <th>Role</th>
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
