import React from "react";

class CourseMenu extends React.Component {
  render() {
    return (
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Announcements</a>
          </li>
          <li>
            <a>Assignments</a>
          </li>
          <li>
            <a>Discussions</a>
          </li>
          <li>
            <a>Grades</a>
          </li>
          <li>
            <a>People</a>
          </li>
          <li>
            <a>Files</a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default CourseMenu;
