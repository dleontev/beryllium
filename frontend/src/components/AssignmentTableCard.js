import React from "react";
import { Link } from "react-router-dom";
class AssignmentTableCard extends React.Component {
  render() {
    return (
      <tr>
        <Link style={{textDecoration: 'none'}} to={`/courses/${this.props.section_id}/assignments/${this.props.id}`}>
          <td>{this.props.name}</td>
        </Link>
        <td>{this.props.content}</td>
        <td>{this.props.due_at}</td>
        <td><span className="icon has-text-link">{this.props.group_id === null ? <i className="fa fa-user"></i> : <i className="fa fa-users"></i>}</span></td>
      </tr>
    );
  }
}

export default AssignmentTableCard;
