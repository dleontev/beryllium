import React from "react";

class UserTableCard extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.first_name} {this.props.middle_name}{" "}
          {this.props.last_name}
        </td>
        <td>{this.props.course_code}</td>
        <td>{this.props.role_name}</td>
      </tr>
    );
  }
}

export default UserTableCard;
