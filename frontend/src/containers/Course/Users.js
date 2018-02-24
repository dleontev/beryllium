import React from "react";
import api from "../../api/Api";
import UserTableCard from "../../components/UserTableCard";
import ReactRouterPropTypes from "react-router-prop-types";
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
      .map(user => <UserTableCard key={user.user_id} {...user} />);
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
        <br />
        <div>{this.getUsersTable()}</div>
      </div>
    );
  }
}

Users.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
};

export default Users;
