import React from "react";
import api from "../../../api/Api";
import NewGroupSetDialog from "../../../components/Form/NewGroupSetDialog";
import EditGroupSetDialog from "../../../components/Form/EditGroupSetDialog";
import GroupSetCard from "../../../components/GroupSetCard";
import ConfirmCard from "../../../components/ConfirmCard";
import GroupSetNav from "../../../components/GroupSetNav";
import PropTypes from "prop-types";
class TeacherView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      members: null,
      currentGroupsetMembers: null,
      groups: null,
      groupsets: null,

      activeGroupsetId: null,
      activeGroupsetIndex: null,

      isConfirmActive: false,
      isNewGroupSetDialogActive: false,
      isEditGroupSetDialogActive: false,
      isNewGroupDialogActive: false
    };

    this.createGroupSet = this.createGroupSet.bind(this);
    this.editGroupSet = this.editGroupSet.bind(this);
    this.deleteActiveGroupset = this.deleteActiveGroupset.bind(this);
  }

  createGroupSet(name, allowSelfSignup, groupCount, maxMembers, autoAssign) {
    if (this.state.groupsets.findIndex(m => m.name === name) !== -1) {
      alert("A group set with this name already exists.");
      return false;
    }

    api
      .post(`/groupsets/`, {
        groupset: {
          is_selfsignup: allowSelfSignup,
          name: name,
          section_id: this.props.sectionId
        }
      })
      .then(response => {
        if (typeof response !== "undefined") {
          if (groupCount > 0) {
            var groups = [];

            name = name.replace("roups", "roup");

            for (var i = 1; i <= groupCount; i++) {
              groups.push({
                name: `${name} ${i}`,
                max_members: maxMembers,
                groupset_id: response.data.data.id,
                section_id: this.props.sectionId
              });
            }

            if (autoAssign && !allowSelfSignup) {
              //var users = this.state.members
              //  .map(m => m.id)
              //  .filter((x, i, a) => a.indexOf(x) === i);
              //var membersPerGroup = Math.floor(users.length / groupCount);
              // TODO: Split users into groups.
            }

            this.retrieveGroupsets();
            this.setState({ activeGroupsetId: response.data.data.id });
          } else {
            this.retrieveGroupsets();
            this.setState({ activeGroupsetId: response.data.data.id });
          }
        }
      });

    return true;
  }

  editGroupSet(name, allowSelfSignup) {
    if (
      name !== this.state.groupsets[this.state.activeGroupsetIndex].name &&
      this.state.groupsets.findIndex(m => m.name === name) !== -1
    ) {
      alert("A group set with this name already exists.");
      return false;
    }

    api.put(`/groupsets/${this.state.activeGroupsetId}`, {
      groupset: {
        name: name,
        is_selfsignup: allowSelfSignup
      }
    });

    var groupsets = this.state.groupsets;

    groupsets[this.state.activeGroupsetIndex].name = name;
    groupsets[this.state.activeGroupsetIndex].is_selfsignup = allowSelfSignup;

    this.setState({ groupsets: groupsets });

    return true;
  }

  deleteActiveGroupset() {
    api.delete("/groupsets/", {
      id: this.state.activeGroupsetId
    });

    var members = this.state.members.filter(
      m => m.groupset_id !== this.state.activeGroupsetId
    );

    var groups = this.state.groups.filter(
      m => m.groupset_id !== this.state.activeGroupsetId
    );

    var groupsets = this.state.groupsets;
    var index = this.state.groupsets.findIndex(
      x => x.id === this.state.activeGroupsetId
    );

    var activeGroupsetId = null;
    var activeGroupsetIndex = null;
    if (index !== -1) {
      groupsets.splice(index, 1);
      if (groupsets.length > 0) {
        activeGroupsetId = groupsets[0].id;
        activeGroupsetIndex = 0;
      }
    }

    this.setState({
      members: members,
      groups: groups,
      groupsets: groupsets,
      activeGroupsetId: activeGroupsetId,
      activeGroupsetIndex: activeGroupsetIndex,
      isConfirmActive: false
    });
  }

  changeActiveGroupset(groupsetId, index) {
    this.setState({ activeGroupsetId: groupsetId, activeGroupsetIndex: index });
  }

  retrieveGroupsets() {
    api.get(`/groupsets/sections/${this.props.sectionId}`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({
          groupsets: response.data.data
        });
        if (
          this.state.activeGroupsetId === null &&
          this.state.groupsets.length > 0
        ) {
          this.setState({
            activeGroupsetIndex: 0,
            activeGroupsetId: response.data.data[0].id
          });
        }
      }
    });

    api.get(`/groups/sections/${this.props.sectionId}`).then(response => {
      if (typeof response !== "undefined" && response.data.data !== undefined) {
        this.setState({ groups: response.data.data });
      }
    });

    api.get(`/groups/users/${this.props.sectionId}`).then(response => {
      if (typeof response !== "undefined" && response.data.data !== undefined) {
        this.setState({ members: response.data.data });
      }
    });
  }

  componentWillMount() {
    this.retrieveGroupsets();
  }

  handleNewGroupToggle() {
    this.setState({
      isNewGroupSetDialogActive: !this.state.isNewGroupSetDialogActive
    });
  }

  getCurrentGroupsetMembers() {
    return this.state.groupsets.map((groupset, index) => (
      <GroupSetNav
        key={groupset.id}
        name={groupset.name}
        active={this.state.activeGroupsetId === groupset.id}
        handleClick={() => this.changeActiveGroupset(groupset.id, index)}
      />
    ));
  }

  getGroupsetData() {
    if (
      this.state.groups === null ||
      this.state.members === null ||
      this.state.groupsets === null
    ) {
      return <div className="loading" />;
    }

    if (this.state.groupsets.length === 0) {
      return "There are currently no group sets in this course. Add a group set to get started.";
    }

    if (this.state.groupsets[this.state.activeGroupsetIndex] === undefined) {
      return;
    }

    return (
      <div>
        <div className="tabs is-boxed">
          <ul>{this.getCurrentGroupsetMembers()}</ul>
        </div>
        <GroupSetCard
          groups={this.state.groups.filter(
            group => group.groupset_id === this.state.activeGroupsetId
          )}
          members={this.state.members.filter(
            member => member.groupset_id === this.state.activeGroupsetId
          )}
          id={this.state.activeGroupsetId}
          sectionId={this.props.sectionId}
          handleGroupsetDelete={() => {
            this.setState({ isConfirmActive: true });
          }}
          handleGroupsetEdit={() => {
            this.setState({ isEditGroupSetDialogActive: true });
          }}
          isSelfSignup={
            this.state.groupsets[this.state.activeGroupsetIndex].is_selfsignup
          }
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.isNewGroupSetDialogActive && (
          <NewGroupSetDialog
            isStudent={false}
            title="New Group"
            closeDialog={() => {
              this.setState({ isNewGroupSetDialogActive: false });
            }}
            createGroupSet={this.createGroupSet}
            sectionId={this.props.sectionId}
          />
        )}

        {this.state.isEditGroupSetDialogActive && (
          <EditGroupSetDialog
            name={this.state.groupsets[this.state.activeGroupsetIndex].name}
            allowSelfSignup={
              this.state.groupsets[this.state.activeGroupsetIndex].is_selfsignup
            }
            closeDialog={() => {
              this.setState({ isEditGroupSetDialogActive: false });
            }}
            editGroupSet={this.editGroupSet}
          />
        )}

        {this.state.isConfirmActive && (
          <ConfirmCard
            onClick={() => this.deleteActiveGroupset()}
            onCancel={() => {
              this.setState({ isConfirmActive: false });
            }}
          />
        )}

        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Groups</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="field is-grouped">
              <button
                className="button is-link"
                onClick={() => {
                  this.setState({ isNewGroupSetDialogActive: true });
                }}
              >
                <span className="icon">
                  <i className="fa fa-plus-circle" />
                </span>
                <span>Group Set</span>
              </button>
            </div>
          </div>
        </nav>

        <div>{this.getGroupsetData()}</div>
      </div>
    );
  }
}

TeacherView.propTypes = {
  sectionId: PropTypes.string
};

export default TeacherView;
