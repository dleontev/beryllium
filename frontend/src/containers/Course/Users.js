import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import UserTableCard from "../../components/UserTableCard";

class Users extends React.Component {
  constructor() {
    super();
    this.state = { users: null, nameFilter: "" };
  }

  componentWillMount() {
    api.get(`/users/sections/${this.props.match.params.id}`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ users: response.data.data });
      }
    });
  }

  handleChange(event) {
    this.setState({ nameFilter: event.target.value.toLowerCase() });
  }

  getUsersTable() {
    if (!this.state.users) return <div className="loading" />;

    if (this.state.users.length === 0) return "There are no users to show.";

    return (
      <table className="table is-fullwidth is-striped is-hoverable">
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
    return this.state.users
      .filter(m => m.name.toLowerCase().includes(this.state.nameFilter))
      .map((user, index) => (
        <UserTableCard
          key={index}
          name={<Link to={"users/" + user.user_id}>{user.name}</Link>}
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
        </nav>
        <span>
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              value={this.state.nameFilter}
              placeholder="Search people"
              onChange={this.handleChange.bind(this)}
              autoFocus
            />
            <span className="icon is-small is-left">
              <i className="fa fa-search" />
            </span>
          </div>
        </span>
        <br/>
        <div>{this.getUsersTable()}</div>
      </div>
    );
  }
}

export default Users;
