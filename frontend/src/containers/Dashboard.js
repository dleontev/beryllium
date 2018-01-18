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
    api.get(`/course_list/`).then(response => {
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
      <div className="container is-fluid">
        <nav class="level">
          <div class="level-left">
            <p className="title is-5">Dashboard</p>
          </div>
        </nav>
        <div class="tile is-ancestor">{tiles}</div>
      </div>
    );
  }
}

export default Dashboard;
