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
      // TODO: Display an error.
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
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>Group Name</label>
                    </td>
                    <td>
                      <input
                        id="groupName"
                        ref="nameInput"
                        type="text"
                        name="name"
                        maxLength="200"
                        value={this.state.name}
                        onChange={this.handleChange.bind(this)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Joining</label>
                    </td>
                    <td>
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <footer className="modal-card-foot">
              <button
                className="button is-link"
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
