import React from "react";
import { Link } from "react-router-dom";

class CourseTableCard extends React.Component {
  render() {
    return (
      <tr>
        <td style={{ "text-align": "left" }}>
          <Link to={"/courses/" + this.props.id}>
            {this.props.course_code} {this.props.section_name}
            {": "}
            {this.props.course_name}
          </Link>
        </td>
        <td>{this.props.start_date}</td>
        <td>{this.props.end_date}</td>
        <td>{this.props.role_name}</td>
        <td>{this.props.visible}</td>
      </tr>
    );
  }
}

export default CourseTableCard;
