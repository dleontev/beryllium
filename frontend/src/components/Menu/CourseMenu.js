import React from "react";
import { Link } from "react-router-dom";

class CourseMenu extends React.Component {
  render() {
    return (
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <Link to={"/courses/" + this.props.id + "/"}>Home</Link>
          </li>
          <li>
            <Link to={"/courses/" + this.props.id + "/announcements"}>
              Announcements
            </Link>
          </li>
          <li>
            <Link to={"/courses/" + this.props.id + "/discussions"}>
              Discussions
            </Link>
          </li>
          <li>
            <Link to={"/courses/" + this.props.id + "/assignments"}>
              Assignments
            </Link>
          </li>
          <li>
            <Link to={"/courses/" + this.props.id + "/pages"}>Pages</Link>
          </li>
          <li>
            <Link to={"/courses/" + this.props.id + "/files"}>Files</Link>
          </li>
          <li>
            <Link to={"/courses/" + this.props.id + "/users"}>People</Link>
          </li>
          <li>
            <Link to={"/courses/" + this.props.id + "/groups"}>Groups</Link>
          </li>
          <li>
            <Link to={"/courses/" + this.props.id + "/settings"}>Settings</Link>
          </li>
        </ul>
      </aside>
    );
  }
}

export default CourseMenu;
