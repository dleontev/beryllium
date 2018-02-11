import React from "react";

class NewGroupCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      joinLevel: "parent_context_auto_join"
    };
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value
    }));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.name.length === 0) {
      console.log("ERROR: Name is empty.");
    } else {
      this.props.createGroup(this.state.name, this.state.joinLevel);
      this.props.closeDialog(e);
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.closeDialog(e);
  }

  render() {
    return (
      <div className={this.props.modalToggle}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">New Student Group</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.closeDialog}
            />
          </header>
          <form onSubmit={this.handleFormSubmit.bind(this)}>
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
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <label>Joining</label>
                </div>
                <select
                  id="joinLevelSelect"
                  value={this.state.joinLevel}
                  onChange={event =>
                    this.setState({ joinLevel: event.target.value })
                  }
                >
                  <option value="parent_context_auto_join">
                    Course members are free to join
                  </option>
                  <option value="invitation_only">
                    Membership by invitation only
                  </option>
                </select>
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

export default NewGroupCard;
