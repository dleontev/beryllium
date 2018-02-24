import React from "react";
import PropTypes from "prop-types";
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

UserListCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default UserListCard;
