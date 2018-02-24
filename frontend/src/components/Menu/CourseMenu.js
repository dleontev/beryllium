import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

class CourseMenu extends React.Component {
  getSettingsNav() {
    return (
      <li>
        <NavLink
          to={`/courses/${this.props.id}/settings`}
          activeClassName="is-active"
        >
          Settings
        </NavLink>
      </li>
    );
  }

  render() {
    return (
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <NavLink
              exact
              to={`/courses/${this.props.id}/`}
              activeClassName="is-active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/courses/${this.props.id}/announcements`}
              activeClassName="is-active"
            >
              Announcements
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/courses/${this.props.id}/discussions`}
              activeClassName="is-active"
            >
              Discussions
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/courses/${this.props.id}/assignments`}
              activeClassName="is-active"
            >
              Assignments
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/courses/${this.props.id}/pages`}
              activeClassName="is-active"
            >
              Pages
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/courses/${this.props.id}/files`}
              activeClassName="is-active"
            >
              Files
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/courses/${this.props.id}/users`}
              activeClassName="is-active"
            >
              People
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/courses/${this.props.id}/groups`}
              activeClassName="is-active"
            >
              Groups
            </NavLink>
          </li>
          {this.props.isTeacher && this.getSettingsNav()}
        </ul>
      </aside>
    );
  }
}

CourseMenu.propTypes = {
  isTeacher: PropTypes.bool,
  id: PropTypes.string.isRequired
};

export default CourseMenu;
