import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import GroupCard from "../../components/GroupCard";
import UserListCard from "../../components/UserListCard";
class Groups extends React.Component {
  constructor() {
    super();
    this.state = { members: [], groups: [] };
  }

  componentWillMount() {
    api.get(`/groups/sections/${this.props.match.params.id}`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ groups: response.data.data });
      }
    });

    api.get(`/groups/users/${this.props.match.params.id}`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ members: response.data.data });
      }
    });
  }

  getGroupSets() {
    return this.state.groups.map((group, index) => (
      <GroupCard
        key={group.id}
        name={`${group.name}: ${group.groupset_name}`}
        members={this.getMembers(group.id)}
      />
    ));
  }

  getMembers(group_id) {
    var members = this.state.members.filter(function(member) {
      return member.group_id === group_id;
    });

    // Shitty design for debugging.
    if (members.length === 0) {
      return (
        <div>
          <li>No members in this group.</li>
        </div>
      );
    }

    return members.map((member, index) => (
      <UserListCard key={member.id} name={member.name} />
    ));
  }

  render() {
    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Groups</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="groups/new">
                <button className="button is-link">
                  <span className="icon">
                    <i className="fa fa-plus-circle" />
                  </span>
                  <span>Group</span>
                </button>
              </Link>
            </div>
          </div>
        </nav>

        <div>{this.getGroupSets()}</div>
      </div>
    );
  }
}

export default Groups;
