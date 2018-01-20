import React from "react";
import { Link } from "react-router-dom";

class GroupTableCard extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <Link
            to={
              "/courses/" +
              this.props.section_id +
              "/groups/" +
              this.props.group_id
            }
          >
            {this.props.group_name}
          </Link>
        </td>
        <td>
          {this.props.course_code} {this.props.course_name}
        </td>
      </tr>
    );
  }
}

export default GroupTableCard;
