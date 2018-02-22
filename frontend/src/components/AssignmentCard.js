import React from "react";

class AssignmentCard extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.content}</td>
        <td>{this.props.due_at}</td>
        <td><span className="icon has-text-link">{this.props.group_id === null ? <i className="fa fa-user"></i> : <i className="fa fa-users"></i>}</span></td>
      </tr>
    );
  }
}

export default AssignmentCard;
