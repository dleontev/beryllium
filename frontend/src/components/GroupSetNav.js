import React from "react";

class GroupSetNav extends React.Component {

  render() {
    return (
      <li className={this.props.active ? "is-active" : "li"}>
        <a onClick={this.props.handleClick}>{this.props.name}</a>
      </li>
    );
  }
}

export default GroupSetNav;
