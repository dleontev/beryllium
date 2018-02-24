import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class UserTableCard extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={"users/" + this.props.user_id}>{this.props.name}</Link>
        </td>
        <td>{this.props.course_code}</td>
        <td>{this.props.role_name}</td>
      </tr>
    );
  }
}

UserTableCard.propTypes = {
  user_id: PropTypes.string.isRequired,
  course_code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role_name: PropTypes.string.isRequired
};

export default UserTableCard;
