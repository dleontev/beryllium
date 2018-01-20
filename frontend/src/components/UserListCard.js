import React from "react";

class UserListCard extends React.Component {
  render() {
    return (
      <li>
        {this.props.first_name} {this.props.middle_name} {this.props.last_name}
      </li>
    );
  }
}

export default UserListCard;
