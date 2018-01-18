import React from "react";
import { Link } from "react-router-dom";

class CourseTableCard extends React.Component {
  render() {
    return (
      <li>
        {this.props.role_name} in{" "}
        <Link to={"/courses/" + this.props.id}>
          {this.props.course_code +
            " " +
            this.props.section_name +
            ": " +
            this.props.course_name}
        </Link>
      </li>
    );
  }
}

export default CourseTableCard;
