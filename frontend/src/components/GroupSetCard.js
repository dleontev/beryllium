import React from "react";
import DropGroupCard from "./DropGroupCard";
import { DragDropContextProvider } from "react-dnd";
import api from "../api/Api";
import NewEditGroupCard from "../components/Form/NewEditGroupCard";
import HTML5Backend from "react-dnd-html5-backend";

class GroupSetCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewGroupDialogActive: false,
      isEditGroupDialogActive: false,
      activeEditGroupIndex: null
    };

    this.handleMove = this.handleMove.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.editGroup = this.editGroup.bind(this);
  }

  createGroup(id, name, maxMembers = -1) {
    api
      .post(`/groups/`, {
        group: {
          name: name,
          section_id: this.props.sectionId,
          max_members: maxMembers === -1 ? 0 : maxMembers,
          groupset_id: this.props.id
        }
      })
      .then(response => {
        if (typeof response !== "undefined") {
          var groups = this.props.groups;
          var group = response.data.data;

          groups.push({
            key: group.id,
            id: group.id,
            name: group.name,
            groupset_id: group.groupset_id,
            max_members: group.max_members,
            is_selfsignup: group.is_selfsignup,
            groupset_name: this.props.name
          });

          this.setState({ groups: groups });
        }
      });

    return true;
  }

  editGroup(groupId, name, maxMembers) {

    console.log(maxMembers);
    if (
      this.props.groups[this.state.activeEditGroupIndex].name !== name ||
      this.props.groups[this.state.activeEditGroupIndex].max_members !== maxMembers
    ) {
      api.put(`/groups/${groupId}`, {
        group: {
          name: name,
          max_members: maxMembers
        }
      });

      var groups = this.props.groups;

      groups[this.state.activeEditGroupIndex].name = name;
      groups[this.state.activeEditGroupIndex].max_members = maxMembers;

      this.setState({ groups: groups });
    }

    return true;
  }

  handleGroupDelete(groupId) {
    var members = this.props.members;

    api.delete(`/groups/${groupId}`);

    for (var i = 0; i < members.length; i++) {
      if (members[i].group_id === groupId) {
        members[i].group_id = null;
      }
    }

    var groups = this.props.groups;
    var index = groups.findIndex(g => g.id === groupId);

    if (index !== -1) {
      groups.splice(index, 1);
    }

    this.setState({ members: members, groups: groups });
  }

  handleGroupEdit(groupId) {
    this.setState({
      activeEditGroupIndex: this.props.groups.findIndex(g => g.id === groupId),
      isEditGroupDialogActive: true
    });
  }

  getUserGroupData() {
    const groups = this.props.groups;

    if (groups.length === 0) {
      return "There are currently no groups in this group set. Add a group to get started.";
    }

    return this.props.groups.map((group, index) => (
      <DropGroupCard
        key={group.id}
        name={group.name}
        handleMove={this.handleMove}
        id={group.id}
        members={this.props.members.filter(function(member) {
          return member.group_id === group.id;
        })}
        isUnassigned={false}
        handleGroupDelete={() => this.handleGroupDelete(group.id)}
        showGroupEdit={() => {
          this.setState({ isEditGroupDialogActive: true });
        }}
        handleGroupEdit={() => this.handleGroupEdit(group.id)}
        max_members={group.max_members}
      />
    ));
  }

  handleJoin(userId, groupId) {
    return api.post("/memberships/", {
      membership: {
        user_id: userId,
        group_id: groupId,
        groupset_id: this.props.id,
        section_id: this.props.sectionId
      }
    });
  }

  handleLeave(userId, groupId) {
    return api.delete("/memberships/", {
      user_id: userId,
      group_id: groupId,
      section_id: this.props.sectionId
    });
  }

  handleSwitchTo(userId, oldGroupId, newGroupId) {
    return api
      .delete("/memberships/", {
        user_id: userId,
        group_id: oldGroupId,
        section_id: this.props.sectionId
      })
      .then(() => {
        return this.handleJoin(userId, newGroupId);
      });
  }

  updateGroup(userId, sourceGroup, targetGroup) {
    var value = null;

    if (targetGroup === null) {
      value = this.handleLeave(userId, sourceGroup);
    } else if (sourceGroup === null) {
      value = this.handleJoin(userId, targetGroup);
    } else {
      value = this.handleSwitchTo(userId, sourceGroup, targetGroup);
    }

    if (value) var members = this.props.members;

    var index = members.findIndex(
      m => m.id === userId && m.group_id === sourceGroup
    );

    if (index !== -1) {
      members[index].group_id = targetGroup;
    }

    this.setState({ members: members });
  }

  handleMove(userId, sourceGroup, targetGroup) {
    if (sourceGroup === "-1") {
      this.updateGroup(userId, null, targetGroup);
    } else if (targetGroup === "-1") {
      this.updateGroup(userId, sourceGroup, null);
    } else {
      this.updateGroup(userId, sourceGroup, targetGroup);
    }
  }

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          {this.state.isNewGroupDialogActive && (
            <NewEditGroupCard
              closeDialog={() => {
                this.setState({ isNewGroupDialogActive: false });
              }}
              handleAction={this.createGroup}
              title="New Group"
            />
          )}

          {this.state.isEditGroupDialogActive && (
            <NewEditGroupCard
              title="Edit Group"
              closeDialog={() => {
                this.setState({ isEditGroupDialogActive: false });
              }}
              handleAction={this.editGroup}
              id={this.props.groups[this.state.activeEditGroupIndex].id}
              name={this.props.groups[this.state.activeEditGroupIndex].name}
              maxMembers={
                this.props.groups[this.state.activeEditGroupIndex].max_members
              }
            />
          )}

          <nav className="navbar">
            <div className="navbar-start">
              {this.props.isSelfSignup &&
                "Self sign-up is enabled for these groups."}
            </div>
            <div className="navbar-end">
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button"
                    onClick={() =>
                      this.setState({ isNewGroupDialogActive: true })
                    }
                  >
                    <span className="icon">
                      <i className="fa fa-plus-circle" />
                    </span>
                    <span>Group</span>
                  </button>
                </div>

                <div className="control">
                  <button
                    className="button"
                    onClick={() => this.props.handleGroupsetEdit()}
                  >
                    <span className="icon">
                      <i className="fa fa-edit" />
                    </span>
                    <span>Edit</span>
                  </button>
                </div>

                <div className="control">
                  <button
                    className="button is-danger is-outlined"
                    onClick={() => this.props.handleGroupsetDelete()}
                  >
                    <span className="icon">
                      <i className="fa fa-trash" />
                    </span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div className="columns">
            <div className="column is-one-third">
              <DropGroupCard
                handleMove={this.handleMove}
                name="Unassigned Students"
                members={this.props.members.filter(function(member) {
                  return member.group_id === null;
                })}
                id={"-1"}
                isUnassigned={true}
                max_members={0}
              />
            </div>
            <div className="column">{this.getUserGroupData()}</div>
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default GroupSetCard;
