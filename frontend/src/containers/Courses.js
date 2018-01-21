import React from "react";
import api from "../api/Api";
import CourseTableCard from "../components/CourseTableCard";

class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentWillMount() {
    api.get(`/courses/user/all`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ courses: response.data.data });
      }
    });
  }

  getCourseTable() {
    if (this.state.courses.length === 0) {
      return "No enrollments found.";
    }

    return (
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Enrolled as</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>{this.getUserCourses()}</tbody>
      </table>
    );
  }

  getUserCourses() {
    return this.state.courses.map((course, index) => {
      return (
        <CourseTableCard
          key={index}
          id={course.id}
          course_name={course.course_name}
          course_code={course.course_code}
          section_name={course.section_name}
          section_id={course.section_id}
          role_name={course.role_name}
          end_date={new Date(course.end_date).toLocaleDateString()}
          start_date={new Date(course.start_date).toLocaleDateString()}
          visible={course.visible ? "Yes" : "No"}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <nav className="level">
          <div className="level-left">
            <p className="title is-5">Your Courses</p>
          </div>
        </nav>
        <div className="box">{this.getCourseTable()}</div>
      </div>
    );
  }
}

export default Courses;
