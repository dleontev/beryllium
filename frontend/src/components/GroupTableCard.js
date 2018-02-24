import React from "react";
import PropTypes from "prop-types";
class GroupTableCard extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.group_link}</td>
        <td>{this.props.course_name}</td>
      </tr>
    );
  }
}

GroupTableCard.propTypes = {
  group_link: PropTypes.string.isRequired,
  course_name: PropTypes.string.isRequired
};

export default GroupTableCard;
