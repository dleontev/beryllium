import React from "react";

class UserListCard extends React.Component {
  render() {
    return (
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-medium">{this.props.name}</span>
        </div>
      </div>
    );
  }
}

export default UserListCard;
