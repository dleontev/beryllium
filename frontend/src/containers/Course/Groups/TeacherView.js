import React from "react";
import api from "../../../api/Api";
import NewGroupSetDialog from "../../../components/Form/NewGroupSetDialog";
import GroupSetCard from "../../../components/GroupSetCard";
import GroupSetNav from "../../../components/GroupSetNav";

class TeacherView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: null,
      currentGroupsetMembers: null,
      groups: null,
      groupsets: null,

      activeGroupsetId: null,

      isNewGroupSetDialogActive: false
    };

    this.createGroupSet = this.createGroupSet.bind(this);
  }

  createGroupSet(
    name,
    allowSelfSignup,
    groupCount,
    autoGenerateGroups,
    sectionId
  ) {
    api
      .post(`/groupsets/`, {
        groupset: {
          is_selfsignup: allowSelfSignup,
          name: name,
          section_id: sectionId
        }
      })
      .then(response => {
        if (typeof response !== "undefined") {
          this.retrieveGroupsets();
          this.setState({ activeGroupsetId: response.data.data.id });
        }
      });

    // TODO: Break down users in groups
    // if (groupCount > 0 && autoGenerateGroups) {

    // }
  }

  changeActiveGroupset(groupsetId) {
    this.setState({ activeGroupsetId: groupsetId });
  }

  retrieveGroupsets() {
    api.get(`/groupsets/sections/${this.props.sectionId}`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({
          groupsets: response.data.data
        });
        if (this.state.activeGroupsetId === null) {
          this.setState({ activeGroupsetId: response.data.data[0].id });
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

  closeDialog() {
    this.handleNewGroupSetToggle();
  }

  handleNewGroupSetToggle() {
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
        handleClick={() => this.changeActiveGroupset(groupset.id)}
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
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <NewGroupSetDialog
          modalToggle={
            this.state.isNewGroupSetDialogActive ? "modal is-active" : "modal"
          }
          closeDialog={() => this.closeDialog()}
          createGroupSet={this.createGroupSet}
          sectionId={this.props.sectionId}
        />

        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Groups</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="field is-grouped">
              <button
                className="button is-link"
                onClick={this.handleNewGroupSetToggle.bind(this)}
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

export default TeacherView;
