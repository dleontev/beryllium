import React from "react";

class GroupCard extends React.Component {
  getActionButton() {
    var disabled = false ? "true" : "false";

    return (
      <div>
        {this.props.allowedToLeave ? (
          <div>
            <button
              className="button is-link"
              onClick={() => this.props.handleLeave()}
            >
              Leave
            </button>
          </div>
        ) : null}
        {this.props.allowedToJoin ? (
          <div>
            <button
              className="button is-link"
              onClick={() => this.props.handleJoin()}
            >
              Join
            </button>
          </div>
        ) : null}
        {this.props.allowedToSwitch ? (
          <div>
            <button
              className="button is-link"
              onClick={() => this.props.handleSwitchTo()}
            >
              Switch To
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div>
        <hr />
        <div className="level">
          <div className="level-left">
            <h2>
              {this.props.name} ::: {this.props.groupset_name}{" "}
            </h2>
          </div>

          <div className="level-right">
            <div className="field is-grouped">
              <div className="control">
                {this.props.current_members}
                {this.props.max_members} students
              </div>
              <div className="control">
                {this.getActionButton()}
                {!this.props.allowedToJoin &&
                  !this.props.allowedToLeave &&
                  !this.props.allowedToSwitch && <i className="fa fa-lock" />}
              </div>
            </div>
          </div>
        </div>
        {this.props.members}
      </div>
    );
  }
}

export default GroupCard;
