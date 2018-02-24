import React from "react";
import PropTypes from "prop-types";
class GroupSetNav extends React.Component {
  render() {
    return (
      <li className={this.props.active ? "is-active" : "li"}>
        <a onClick={this.props.handleClick}>
          <span>{this.props.name}</span>
        </a>
      </li>
    );
  }
}

GroupSetNav.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

export default GroupSetNav;
