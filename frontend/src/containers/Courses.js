import React from "react";
import api from "../api/Api";
import { Link } from "react-router-dom";
import CourseTableCard from "../components/CourseTableCard";

class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: null
    };
  }

  /**
   * Retrieves the list of courses.
   */
  
  componentWillMount() {
    api.get(`/courses/user/all`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ courses: response.data.data });
      }
    });
  }

  /**
   * Creates a table that contains the courses the current user enrolled in.
   */

  getCourseTable() {
    if (this.state.courses === null) return <div className="loading" />;

    if (this.state.courses.length === 0) return "No enrollments found.";

    return (
      <table className="table is-fullwidth is-striped is-hoverable">
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

  /**
   * Generates individual course rows using the GroupTableCard component.
   */
  getUserCourses() {
    return this.state.courses.map((course, index) => {
      return (
        <CourseTableCard
          key={index}
          id={course.id}
          course_title={`${course.course_code} : ${course.course_name}`}
          course_link={
            course.published ? (
              <Link to={`/courses/${course.section_id}`}>
                {`${course.course_code} : ${course.course_name}`}
              </Link>
            ) : (
              `${course.course_code} : ${course.course_name}`
            )
          }
          role_name={course.role_name}
          end_date={new Date(course.end_date).toLocaleDateString()}
          start_date={new Date(course.start_date).toLocaleDateString()}
          published={course.published ? "Yes" : "No"}
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
