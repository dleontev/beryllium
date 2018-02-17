import React from "react";

class AssignmentCard extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.content}</td>
        <td>{this.props.due_at}</td>
      </tr>
    );
  }
}

export default AssignmentCard;
