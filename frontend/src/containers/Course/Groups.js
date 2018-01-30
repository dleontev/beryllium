import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import GroupCard from "../../components/GroupCard";
import UserListCard from "../../components/UserListCard";
class Groups extends React.Component {
  constructor() {
    super();
    this.state = { members: null, groups: null };
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

  handleLeave(group_id) {
    // TODO: Add code to handle the current user leaving the given group.
  }

  getGroupSets() {
    if (!this.state.groups || !this.state.members)
      return <div className="loading" />;

    if (this.state.groups.length === 0) {
      return "There are no groups to show.";
    }

    return this.state.groups.map((group, index) => {
      const members = this.state.members.filter(function(member) {
        return member.group_id === group.id;
      });

      //////////////////////////////////////////////////
      // NEED TO SOMEHOW RETRIEVE THE CURRENT USER ID //
      //////////////////////////////////////////////////
      const is_current_user =
        typeof members.find(
          x => x.id === "936ce3dc-d258-4c22-8703-3e99d85dabfd" // CURRENT_USER_ID
        ) !== "undefined";
      ////////////////////////////////////////////////

      return (
        <GroupCard
          key={group.id}
          name={group.name}
          groupset_name={group.groupset_name}
          members={this.getMembersList(members)}
          current_members={members.length}
          max_members={group.max_members > 0 ? `/${group.max_members}` : ""}
          is_current_user={is_current_user}
          onClick={() => this.handleLeave(group.id)}
        />
      );
    });
  }

  getMembersList(members) {
    if (members.length === 0) {
      return;
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
