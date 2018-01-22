import React from "react";

class UserTableCard extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.course_code}</td>
        <td>{this.props.role_name}</td>
      </tr>
    );
  }
}

export default UserTableCard;
