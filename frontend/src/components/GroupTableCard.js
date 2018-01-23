import React from "react";

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

export default GroupTableCard;
