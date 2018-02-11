import React from "react";
import NewGroupSetDialog from "../../../components/Form/NewGroupSetDialog";

class TeacherView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: null,
      groups: null,
      sectionId: this.props.sectionId,
      isNewGroupSetDialogActive: false,
      currentGroupSet: null
    };
  }

  createGroupSet(name, allowSelfSignup, groupCount, autoGenerateGroups) {
    // TODO: Create a new group.
    console.log("Creating a group set...");
    console.log("Name:" + name);
    console.log("selfSignUp:" + allowSelfSignup);
    console.log("groupCount:" + groupCount);
    console.log("autoGenerate:" + autoGenerateGroups);

    // TODO: Api post to create a group set.
    // api.post(`/groupsets/`, {
    //   email: this.state.email.toLowerCase(),
    //   name: this.state.name,
    //   password: this.state.password
    // });

    if (groupCount > 0 && autoGenerateGroups) {
      // TODO: Break down users in groups
    }
  }

  closeDialog() {
    this.handleNewGroupSetToggle();
  }

  handleNewGroupSetToggle() {
    this.setState({
      isNewGroupSetDialogActive: !this.state.isNewGroupSetDialogActive
    });
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

        <div>content</div>
      </div>
    );
  }
}

export default TeacherView;
