import React from "react";
import UserProfileCard from "../components/UserProfileCard";
import CourseListCard from "../components/CourseListCard";
import profile_image from "../images/blank-profile.png";
import api from "../api/Api";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: [], courses: [] };
  }

  componentWillMount() {
    api.get("/account").then(response => {
      if (typeof response !== "undefined") {
        this.setState({ user: response.data.data });
      }
    });

    api.get("/courses/user/all").then(response => {
      if (typeof response !== "undefined") {
        this.setState({ courses: response.data.data });
      }
    });
  }

  getUserCourses() {
    if (this.state.courses.length === 0) {
      return <li>No enrollments found.</li>;
    }

    return this.state.courses.map((course, index) => (
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

  getUserCard() {
    if (this.state.user === null) {
      return;
    }

    return (
      <UserProfileCard
        id={this.state.user.id}
        first_name={this.state.user.first_name}
        last_name={this.state.user.last_name}
        middle_name={this.state.user.middle_name}
        profile_image={profile_image}
        email={this.state.user.email}
        courses={this.getUserCourses()}
      />
    );
  }

  ///////////////// INCOMPLETE SIGNOUT ////////////
  handleLogout(event) {
    event.preventDefault();
    
    api.delete("/sessions").then(() => {
      localStorage.removeItem("token");
      this.props.history.push("/login");
    });
  }
  ////////////////////////////////////////////////

  render() {
    return (
      <div className="container">
        <div className="level-right">
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Edit Profile</button>
            </div>
            <div className="control">
              <button
                className="button is-link"
                onClick={this.handleLogout.bind(this)}
              >
                <span className="icon">
                  <i className="fa fa-sign-out" />
                </span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="box">{this.getUserCard()}</div>
      </div>
    );
  }
}

export default Profile;
