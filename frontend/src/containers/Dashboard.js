import React from "react";
import DashboardTile from "../components/DashboardTile";
import api from "../api/Api";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentWillMount() {
    api.get(`/courses/user/all`).then(response => {
      this.setState({ courses: response.data.data });
    });
  }

  render() {
    const tiles = this.state.courses.map((course, index) => {
      return (
        <DashboardTile
          key={index}
          id={course.id}
          course_name={course.course_name}
          course_code={course.course_code}
          section_name={course.section_name}
        />
      );
    });

    return (
      <div>
        <nav className="level">
          <div className="level-left">
            <p className="title is-5">Dashboard</p>
          </div>
          <div className="level-right">
            <p className="title is-5">Recent</p>
          </div>
        </nav>
        <div className="tile is-ancestor is-vertical">{tiles}</div>
      </div>
    );
  }
}

export default Dashboard;
