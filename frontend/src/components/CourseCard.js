import React from "react";
import { Link } from "react-router-dom";

class CourseCard extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={"/courses/" + this.props.id}>
            {this.props.id}{" "}
          </Link>
        </td>
        <td>{this.props.start_date}</td>
        <td>{this.props.end_date}</td>
      </tr>
    );
  }
}

export default CourseCard;