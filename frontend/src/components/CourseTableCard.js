import React from "react";

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

export default CourseTableCard;
