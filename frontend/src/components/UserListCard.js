import React from "react";

class UserListCard extends React.Component {
  render() {
    return <li>{this.props.name}</li>;
  }
}

export default UserListCard;
