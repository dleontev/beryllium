import React from "react";

class GroupCard extends React.Component {
  render() {
    // Shitty design for debugging.
    return (
      <div>
        <h2>{this.props.name}</h2>
        {this.props.members}
        <br />
      </div>
    );
  }
}

export default GroupCard;
