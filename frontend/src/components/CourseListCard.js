import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
class CourseListCard extends React.Component {
  render() {
    return (
      <li>
        {this.props.role_name} in{" "}
        <Link to={`/courses/${this.props.section_id}`}>
          {`${this.props.course_code} : ${this.props.course_name}`}
        </Link>
      </li>
    );
  }
}

CourseListCard.propTypes = {
  section_id: PropTypes.string.isRequired,
  course_code: PropTypes.string.isRequired,
  course_name: PropTypes.string.isRequired,
  role_name: PropTypes.string.isRequired,
};

export default CourseListCard;
