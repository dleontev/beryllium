import React from "react";
import PropTypes from "prop-types";
class NewEditGroupCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name === undefined ? "" : this.props.name,
      maxMembers:
        this.props.maxMembers === undefined || this.props.maxMembers === 0
          ? ""
          : this.props.maxMembers
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value
    }));
  }

  handleFormSubmit(event) {
    event.preventDefault();

    if (this.state.name === undefined || this.state.name.length === 0) {
      alert("Please, enter a valid group name.");
      return;
    }

    if (
      this.props.handleAction(
        this.props.id,
        this.state.name,
        this.state.maxMembers.length === 0 ? 0 : this.state.maxMembers
      ) === true
    ) {
      this.props.closeDialog(event);
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.closeDialog(event);
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.closeDialog}
            />
          </header>
          <form onSubmit={this.handleFormSubmit}>
            <section className="modal-card-body">
              <div className="field is-grouped">
                <div className="control">
                  <label>Group Name</label>
                </div>
                <input
                  id="groupName"
                  type="text"
                  name="name"
                  maxLength="100"
                  value={this.state.name}
                  onChange={this.handleChange}
                  autoFocus
                />
              </div>
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
                    value={this.state.maxMembers}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="control">
                  <label>
                    members <small>(Leave blank for no limit)</small>
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

NewEditGroupCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  maxMembers: PropTypes.number.isRequired,
  handleAction: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired
};

export default NewEditGroupCard;
