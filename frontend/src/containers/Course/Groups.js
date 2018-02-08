import React from "react";
import api from "../../api/Api";
import GroupCard from "../../components/GroupCard";
import UserListCard from "../../components/UserListCard";
import NewGroupDialog from "../../components/Form/NewGroupDialog";
import { Link } from "react-router-dom";
import $ from "jquery";

class Groups extends React.Component {
  constructor() {
    super();
    this.state = {
      members: null,
      groups: null,
      isNewGroupDialogActive: false
    };
  }

  createGroup(name, joinLevel) {
    // TODO: Create a new group.
    console.log("Creating group....");
    console.log("Name:" + name);
    console.log("Joinlevel:" + joinLevel);
  }

  handleLeave(groupId) {
    $(":button").prop("disabled", true);
    api
      .delete("/memberships/", {
        group_id: groupId,
        section_id: this.props.match.params.id
      })
      .then(() => {
        this.retrieveGroupData();
      });
  }

  handleJoin(groupId) {
    $(":button").prop("disabled", true);
    api
      .post("/memberships/", {
        membership: {
          user_id: api.getUserId(),
          group_id: groupId,
          section_id: this.props.match.params.id
        }
      })
      .then(() => {
        this.retrieveGroupData();
      });
  }

  handleSwitchTo(oldGroupId, newGroupId) {
    $(":button").prop("disabled", true);
    api
      .delete("/memberships/", {
        group_id: oldGroupId,
        section_id: this.props.match.params.id
      })
      .then(() => {
        this.handleJoin(newGroupId);
      });
  }

  retrieveGroupData() {
    api.get(`/groups/sections/${this.props.match.params.id}`).then(response => {
      if (typeof response !== "undefined" && response.data.data !== undefined) {
        this.setState({ groups: response.data.data });
      }
    });

    api.get(`/groups/users/${this.props.match.params.id}`).then(response => {
      if (typeof response !== "undefined" && response.data.data !== undefined) {
        this.setState({ members: response.data.data });
        $(":button").prop("disabled", false);
      }
    });
  }

  closeDialog() {
    this.handleNewGroupToggle();
  }

  componentWillMount() {
    this.retrieveGroupData();
  }

  handleNewGroupToggle() {
    this.setState({
      isNewGroupDialogActive: !this.state.isNewGroupDialogActive
    });
  }

  getMembersList(members) {
    if (members.length === 0) {
      return;
    }

    return members.map((member, index) => (
      <UserListCard
        key={member.id}
        name={
          <Link
            to={`/courses/${this.props.match.params.id}/users/${
              member.id
            }`}
          >
            {member.name}
          </Link>
        }
      />
    ));
  }

  getGroupSets() {
    if (this.state.groups === null || this.state.members === null) {
      return <div className="loading" />;
    }

    if (this.state.groups.length === 0) {
      return "There are no groups to show.";
    }

    const currentUserId = api.getUserId();

    const currentUserGroups = this.state.members
      .filter(function(member) {
        return member.id === currentUserId;
      })
      .map(x => x.group_id);

    var currentUserGroupsets = this.state.groups.filter(function(group) {
      return currentUserGroups.includes(group.id);
    });

    return this.state.groups.map((group, index) => {
      const members = this.state.members.filter(function(member) {
        return member.group_id === group.id;
      });

      const allowedToLeave =
        members.find(x => x.id === currentUserId) !== undefined;

      var memberOfGroupset = currentUserGroupsets
        .map(x => x.groupset_id)
        .includes(group.groupset_id);

      var isGroupUnlocked =
        members.length < group.max_members || group.max_members === 0;

      const allowedToJoin =
        !allowedToLeave && !memberOfGroupset && isGroupUnlocked;

      const allowedToSwitch =
        !allowedToLeave && memberOfGroupset && isGroupUnlocked;

      var sourceGroup;

      if (allowedToSwitch) {
        var temp = currentUserGroupsets.find(
          x => x.groupset_id === group.groupset_id
        );
        if (temp) sourceGroup = temp.id;
      }

      return (
        <GroupCard
          key={group.id}
          name={group.name}
          groupset_name={group.groupset_name}
          members={this.getMembersList(members)}
          current_members={members.length}
          max_members={group.max_members > 0 ? `/${group.max_members}` : null}
          allowedToLeave={allowedToLeave}
          allowedToJoin={allowedToJoin}
          allowedToSwitch={allowedToSwitch}
          handleLeave={() => this.handleLeave(group.id, true)}
          handleJoin={() => this.handleJoin(group.id)}
          handleSwitchTo={() => this.handleSwitchTo(sourceGroup, group.id)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <NewGroupDialog
          modalToggle={
            this.state.isNewGroupDialogActive ? "modal is-active" : "modal"
          }
          closeDialog={() => this.closeDialog()}
          createGroup={this.createGroup}
        />
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Groups</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <button
                id="Button"
                className="button is-link"
                onClick={this.handleNewGroupToggle.bind(this)}
              >
                <span className="icon">
                  <i className="fa fa-plus-circle" />
                </span>
                <span>Group</span>
              </button>
            </div>
          </div>
        </nav>

        <div>{this.getGroupSets()}</div>
      </div>
    );
  }
}

export default Groups;
