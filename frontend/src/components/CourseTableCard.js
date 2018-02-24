import React from "react";
import PropTypes from "prop-types";
class CourseTableCard extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.course_link}</td>
        <td>{this.props.start_date}</td>
        <td>{this.props.end_date}</td>
        <td>{this.props.role_name}</td>
        <td>{this.props.published}</td>
      </tr>
    );
  }
}

CourseTableCard.propTypes = {
  course_link: PropTypes.object.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  role_name: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired
};

export default CourseTableCard;
