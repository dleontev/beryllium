import React from "react";
import logo from "../images/blank-profile.png";
import CourseListCard from "../components/CourseListCard";

class UserProfileCard extends React.Component {
  getUserCourses() {
    if (this.props.courses.length === 0) {
      return <li>No enrollments found.</li>;
    }

    return this.props.courses.map((course, index) => (
      <CourseListCard
        key={index}
        id={course.id}
        role_name={course.role_name}
        course_name={course.course_name}
        section_name={course.section_name}
        section_id={course.section_id}
        course_code={course.course_code}
      />
    ));
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <figure className="image is-128x128">
            <img src={logo} className="profile-image" alt="Change profile" />
          </figure>
          <br />
          <div className="container">
            <h1 className="title">
              {this.props.first_name} {this.props.middle_name}{" "}
              {this.props.last_name}
            </h1>
          </div>
        </div>
        <br />
        <div className="container">
          <h2 className="subtitle">Contact</h2>
          <li>{this.props.email}</li>
        </div>
        <br />
        <div className="container">
          <h2 className="subtitle">Enrollments</h2>
          {this.getUserCourses()}
        </div>
      </section>
    );
  }
}

export default UserProfileCard;
