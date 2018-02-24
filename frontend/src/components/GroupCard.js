import React from "react";

class GroupCard extends React.Component {
  getActionButton() {
    if (this.props.allowedToLeave) {
      return <a onClick={() => this.props.handleLeave()}>Leave</a>;
    }

    if (this.props.allowedToJoin) {
      return <a onClick={() => this.props.handleJoin()}>Join</a>;
    }

    if (this.props.allowedToSwitch) {
      return <a onClick={() => this.props.handleSwitchTo()}>Switch To</a>;
    }

    return <i className="fa fa-lock" />;
  }

  getFullStatus() {
    var memberCount =
      this.props.members !== undefined ? this.props.members.length : 0;

    return memberCount === this.props.max_members &&
      this.props.max_members > 0 ? (
      <span className="label-info">Full</span>
    ) : (
      ""
    );
  }

  getMemberCount() {
    var memberCount =
      this.props.members !== undefined ? this.props.members.length : 0;

    return (
      <span className="label-info">
        {memberCount}
        {this.props.max_members > 0 ? "/" + this.props.max_members : ""} members
      </span>
    );
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <b>{this.props.name}</b>&nbsp;<sup style={{ fontSize: 12 }}>
                  {this.props.groupset_name}
                </sup>
              </div>
            </div>

            <div className="level-right">
              <p className="level-item">{this.getFullStatus()}</p>
              <p className="level-item">{this.getMemberCount()}</p>
              <p className="level-item">{this.getActionButton()}</p>
            </div>
          </nav>
        </div>

        <div className="panel-block">
          <div className="field is-grouped is-grouped-multiline">
            {this.props.members}
          </div>
        </div>
      </div>
    );
  }
}

export default GroupCard;
