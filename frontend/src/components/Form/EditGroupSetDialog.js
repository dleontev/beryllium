import React from "react";
import PropTypes from "prop-types";
class EditGroupSetDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      allowSelfSignup: this.props.allowSelfSignup,
      groupCount: 0,
      autoGenerateGroups: null
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
    } else {
      var ok = this.props.editGroupSet(
        this.state.name,
        this.state.allowSelfSignup
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
            <p className="modal-card-title">Edit Group Set</p>
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

EditGroupSetDialog.propTypes = {
  name: PropTypes.string.isRequired,
  allowSelfSignup: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  editGroupSet: PropTypes.func.isRequired
};

export default EditGroupSetDialog;
