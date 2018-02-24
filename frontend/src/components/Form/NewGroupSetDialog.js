import React from "react";

class NewGroupSetDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      allowSelfSignup: false,
      groupCount: 0,
      maxMembers: 0,
      autoAssign: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.closeDialog(e);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.name.length === 0) {
      alert("Please, enter a valid group set name.");
    } else if (
      this.state.autoGenerate === true &&
      this.state.groupCount === 0
    ) {
      alert("Please, enter a valid number of members per group.");
    } else if (this.allowSelfSignup && this.state.autoAssign === null) {
      alert("Select whether or not to create groups automatically.");
    } else {
      var ok = this.props.createGroupSet(
        this.state.name,
        this.state.allowSelfSignup,
        this.state.groupCount,
        this.state.maxMembers,
        this.state.autoAssign
      );

      if (ok) {
        this.props.closeDialog(e);
      }
    }
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">New Group Set</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.closeDialog}
            />
          </header>
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <section className="modal-card-body">
              <label className="label">Group Set Name</label>
              <div className="field">
                <input
                  type="text"
                  name="name"
                  maxLength="100"
                  className="input"
                  placeholder="ex. Project Groups"
                  value={this.state.name}
                  onChange={this.handleChange}
                  autoFocus
                />
              </div>
              <hr />
              <span className="label">Self Sign-Up</span>

              <div className="field has-addons is-grouped">
                <div className="field is-grouped">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={this.state.allowSelfSignup}
                      name="allowSelfSignup"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span> Allow self sign-up</span>
                  </label>
                </div>
              </div>
              <hr />

              <span className="label">Group Structure</span>

              {!this.state.allowSelfSignup && (
                <div className="field">
                  <label className="radio">
                    <input
                      type="radio"
                      name="autoAssign"
                      value="true"
                      checked={this.state.autoAssign === "true"}
                      onChange={this.handleChange.bind(this)}
                    />{" "}
                    Split students into{" "}
                    <input
                      type="number"
                      min="0"
                      max="100"
                      text="0"
                      name="groupCount"
                      placeholder="0"
                      onChange={this.handleChange}
                    />{" "}
                    groups
                  </label>
                </div>
              )}

              {!this.state.allowSelfSignup && (
                <div className="field is-grouped">
                  <label className="radio">
                    <input
                      type="radio"
                      name="autoAssign"
                      value="false"
                      checked={this.state.autoAssign === "false"}
                      onChange={this.handleChange.bind(this)}
                    />{" "}
                    I'll create groups manually
                  </label>
                </div>
              )}

              {this.state.allowSelfSignup && (
                <div className="field is-grouped">
                  <div className="control">
                    <label>Create</label>
                  </div>
                  <div className="control">
                    <input
                      type="number"
                      min="0"
                      max="99999"
                      text="0"
                      name="groupCount"
                      placeholder="0"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="control">
                    <label>groups now</label>
                  </div>
                </div>
              )}

              {this.state.allowSelfSignup && (
                <div className="field is-grouped">
                  <div className="control">
                    <label>Limit groups to</label>
                  </div>
                  <div className="control">
                    <input
                      type="number"
                      min="2"
                      max="99999"
                      name="maxMembers"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="control">
                    <label>
                      members <small>(Leave blank for no limit)</small>
                    </label>
                  </div>
                </div>
              )}
            </section>

            <footer className="modal-card-foot">
              <button
                className="button"
                type="cancel"
                value="Cancel"
                onClick={this.handleCancel.bind(this)}
              >
                Cancel
              </button>
              <button className="button is-link" type="submit">
                Submit
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

export default NewGroupSetDialog;
