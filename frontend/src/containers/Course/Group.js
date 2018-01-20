import React from "react";
import { Link } from "react-router-dom";
import UserListCard from "../../components/UserListCard";
import api from "../../api/Api";

class Group extends React.Component {
  constructor() {
    super();
    this.state = { users: [], group: [] };
  }

  componentWillMount() {
    api.get("/groups/" + this.props.match.params.id).then(response => {
      this.setState({ group: response.data.data });
    });
    api.get("/users/groups/" + this.props.match.params.id).then(response => {
      this.setState({ users: response.data.data });
    });
  }

  render() {
    const users = this.state.users.map((user, index) => (
      <UserListCard
        key={index}
        id={user.id}
        first_name={user.first_name}
        last_name={user.last_name}
        middle_name={user.middle_name}
      />
    ));

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Group Name: {this.state.group.name}</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end" />
        </nav>

        <div>
          <h1 className="is-size-4">Members:</h1>
          <div className="section">{users}</div>
        </div>
      </div>
    );
  }
}

export default Group;
