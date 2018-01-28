import React from "react";

class GroupCard extends React.Component {
  render() {
    // Shitty design for debugging.
    return (
      <div>
        <h2>
          <b>{this.props.name}</b> ::: {this.props.groupset_name}
          <br />
          {this.props.current_members}
          {this.props.max_members} members{" "}
        </h2>
        {this.props.members}
        <br />
      </div>
    );
  }
}

export default GroupCard;
