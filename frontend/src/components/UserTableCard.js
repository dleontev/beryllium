import React from "react";
import { Link } from "react-router-dom";

class UserTableCard extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={"/users/" + this.props.id}>
            {this.props.first_name} {this.props.middle_name}{" "}
            {this.props.last_name}
          </Link>
        </td>
        <td>{this.props.email}</td>
      </tr>
    );
  }
}

export default UserTableCard;
