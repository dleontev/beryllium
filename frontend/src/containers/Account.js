import React from "react";
import UserProfileCard from "../components/UserProfileCard";
import CourseListCard from "../components/CourseListCard";
import profile_image from "../images/blank-profile.png";
import ReactRouterPropTypes from "react-router-prop-types";
import api from "../api/Api";
//import aws from "../api/Aws";

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      courses: null
    };
  }

  /**
   * Retrieves the user account data.
   */

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

  /**
   * Generates a list of courses the current user enrolled in.
   */

  getUserCourses() {
    if (this.state.courses.length === 0) return <li>No enrollments found.</li>;

    return this.state.courses.map((course, index) => (
      <CourseListCard
        key={index}
        role_name={course.role_name}
        course_name={course.course_name}
        section_name={course.section_name}
        section_id={course.section_id}
        course_code={course.course_code}
      />
    ));
  }

  /**
   * Generates the profile card for the current user.
   */

  getUserCard() {
    if (!this.state.user || !this.state.courses)
      return <div className="loading" />;

    return (
      <UserProfileCard
        id={this.state.user.id}
        name={this.state.user.name}
        profile_image={profile_image}
        email={this.state.user.email}
        showEnrollments={true}
        courses={this.getUserCourses()}
      />
    );
  }

  /**
   * Logs the current user out by removing his session data.
   */

  handleLogout(event) {
    event.preventDefault();

    api.delete("/sessions").then(() => {
      localStorage.removeItem("token");
      this.props.history.push("/login");
    });
  }

  render() {
    return (
      <div
        className="container"
        style={{
          maxWidth: "800px"
        }}
      >
        <div>
          <div className="level-right">
            <div className="field is-grouped">
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
      </div>
    );
  }
}

Account.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

export default Account;
