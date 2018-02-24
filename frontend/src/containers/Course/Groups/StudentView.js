import React from "react";
import api from "../../../api/Api";
import GroupCard from "../../../components/GroupCard";
import UserListCard from "../../../components/UserListCard";
import NewGroupDialog from "../../../components/Form/NewGroupDialog";
import $ from "jquery";

class StudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: null,
      groups: null,
      isNewGroupDialogActive: false,
      sectionId: this.props.sectionId
    };
  }

  createGroup(name, joinLevel) {
    // TODO: Create a new group.
    console.log("Creating group....");
    console.log("Name:" + name);
    console.log("Joinlevel:" + joinLevel);

    // TODO: Api post to create a group and join the user.
  }

  handleLeave(groupId) {
    $(":button").prop("disabled", true);
    api
      .delete("/memberships/", {
        group_id: groupId,
        section_id: this.state.sectionId
      })
      .then(() => {
        this.retrieveGroupData();
      });
  }

  handleJoin(groupId, groupSetId) {
    $(":button").prop("disabled", true);
    api
      .post("/memberships/", {
        membership: {
          user_id: api.getUserId(),
          group_id: groupId,
          groupset_id: groupSetId,
          section_id: this.state.sectionId
        }
      })
      .then(() => {
        this.retrieveGroupData();
      });
  }

  handleSwitchTo(oldGroupId, newGroupId, groupSetId) {
    $(":button").prop("disabled", true);
    api
      .delete("/memberships/", {
        group_id: oldGroupId,
        section_id: this.state.sectionId
      })
      .then(() => {
        this.handleJoin(newGroupId, groupSetId);
      });
  }

  retrieveGroupData() {
    api.get(`/groups/sections/${this.state.sectionId}`).then(response => {
      if (typeof response !== "undefined" && response.data.data !== undefined) {
        this.setState({ groups: response.data.data });
      }
    });

    api.get(`/groups/users/${this.state.sectionId}`).then(response => {
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
      <UserListCard key={member.id} name={member.name} />
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

    var groups = this.state.groups;

    function filterMember(member) {
      return member.group_id === groups[key].id;
    }

    for (var key in groups) {
      groups[key].members = this.state.members.filter(filterMember);
    }

    var currentUserGroupsets = this.state.groups.filter(function(group) {
      return currentUserGroups.includes(group.id);
    });

    return groups.map((group, index) => {
      const allowedToLeave =
        group.members.find(x => x.id === currentUserId) !== undefined &&
        group.is_selfsignup;

      var memberOfGroupset = currentUserGroupsets
        .map(x => x.groupset_id)
        .includes(group.groupset_id);

      var isGroupUnlocked =
        (group.members.length < group.max_members || group.max_members === 0) &&
        group.is_selfsignup;

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
          groupset_id={group.groupset_id}
          members={this.getMembersList(group.members)}
          current_members={group.members.length}
          max_members={group.max_members > 0 ? `/${group.max_members}` : null}
          allowedToLeave={allowedToLeave}
          allowedToJoin={allowedToJoin}
          allowedToSwitch={allowedToSwitch}
          handleLeave={() => this.handleLeave(group.id, true)}
          handleJoin={() => this.handleJoin(group.id, group.groupset_id)}
          handleSwitchTo={() =>
            this.handleSwitchTo(sourceGroup, group.id, group.groupset_id)
          }
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

        {this.getGroupSets()}
      </div>
    );
  }
}

export default StudentView;
