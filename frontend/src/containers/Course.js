import React from "react";
import { Route, Switch } from "react-router-dom";
import api from "../api/Api";

import ReactRouterPropTypes from "react-router-prop-types";

// Small components.
import CourseMenu from "../components/Menu/CourseMenu";
import AddPost from "../components/Form/AddPost";
import AddAssignment from "../components/Form/AddAssignment";
import AddPage from "../components/Form/AddPage";

// Main containers.
import Profile from "./Course/Profile";
import CourseHome from "./Course/CourseHome";
import Posts from "./Course/Posts";
import Announcements from "./Course/Announcements";
import Assignments from "./Course/Assignments";
import Files from "./Course/Files";
import Discussions from "./Course/Discussions";
import Pages from "./Course/Pages";
import Users from "./Course/Users";
import Groups from "./Course/Groups/Groups";
import Settings from "./Course/Settings";
import NotFound from "./NotFound";
import AssignmentCard from "../components/AssignmentCard";

class Course extends React.Component {
  constructor() {
    super();
    this.state = { course: [], isTeacher: null };
  }

  /**
   * Retrieves the role of the current user for the current corse,
   * and the course date.
   */

  componentWillMount() {
    if (this.state.isTeacher === null) {
      api.isTeacher(this.props.match.params.id).then(response => {
        this.setState({ isTeacher: response });
      });
    }

    api
      .get("/courses/sections/" + this.props.match.params.id)
      .then(response => {
        if (typeof response !== "undefined") {
          this.setState({ course: response.data.data });
        }
      });
  }

  /**
   * Returns the current course title, or undefined.
   */

  getCourseTitle() {
    if (this.state.course === null || this.state.course.length === 0) {
      return "undefined";
    }

    return `${this.state.course.code} : ${this.state.course.name}`;
  }

  /**
   * Returns the current course id, or undefined.
   */

  getCourseId() {
    if (this.state.course === null || this.state.course.length === 0) {
      return "undefined";
    }

    return this.props.match.params.id;
  }

  render() {
    return (
      <div>
        <nav className="level">
          <div className="level-left">
            <p className="title is-5">{this.getCourseTitle()}</p>
          </div>
        </nav>
        <div className="columns">
          <div className="column is-narrow">
            <div className="box" style={{ width: "200px" }}>
              <CourseMenu
                id={this.getCourseId()}
                isTeacher={this.state.isTeacher}
              />
            </div>
          </div>
          <div className="column">
            <div className="box">
              <div>
                <Switch>
                  <Route
                    exact
                    path="/courses/:id/announcements"
                    render={props => (
                      <Announcements
                        {...props}
                        section_id={this.props.match.params.id}
                        isTeacher={this.state.isTeacher}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/announcements/new"
                    render={props => (
                      <AddPost
                        {...props}
                        section_id={this.props.match.params.id}
                        is_discussion={false}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/announcements/:discussion_id"
                    render={props => (
                      <Posts
                        {...props}
                        section_id={this.props.match.params.id}
                        isTeacher={this.state.isTeacher}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/discussions/new"
                    render={props => (
                      <AddPost
                        {...props}
                        section_id={this.props.match.params.id}
                        is_discussion={true}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/assignments/new"
                    component={AddAssignment}
                  />

                  <Route
                    exact
                    path="/courses/:id/assignments/:assignment_id"
                    component={AssignmentCard}
                  />

                  <Route
                    exact
                    path="/courses/:id/pages/new"
                    component={AddPage}
                  />

                  <Route
                    exact
                    path="/courses/:id/assignments"
                    render={props => (
                      <Assignments
                        {...props}
                        section_id={this.props.match.params.id}
                        isTeacher={this.state.isTeacher}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/discussions"
                    component={Discussions}
                  />

                  <Route
                    exact
                    path="/courses/:id/discussions/:discussion_id"
                    render={props => (
                      <Posts
                        {...props}
                        section_id={this.props.match.params.id}
                        isTeacher={this.state.isTeacher}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/settings"
                    component={Settings}
                  />

                  <Route
                    exact
                    path="/courses/:id/groups"
                    render={props => (
                      <Groups
                        {...props}
                        isTeacher={this.state.isTeacher}
                        section_id={this.props.match.params.id}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/pages"
                    render={props => (
                      <Pages
                        {...props}
                        section_id={this.props.match.params.id}
                        isTeacher={this.state.isTeacher}
                      />
                    )}
                  />

                  <Route exact path="/courses/:id/users" component={Users} />

                  <Route
                    exact
                    path="/courses/:id/users/:user_id"
                    component={Profile}
                  />

                  <Route
                    exact
                    path="/courses/:id/files"
                    render={props => (
                      <Files
                        {...props}
                        section_id={this.props.match.params.id}
                        isTeacher={this.state.isTeacher}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/"
                    render={props => (
                      <CourseHome
                        {...props}
                        section_id={this.props.match.params.id}
                        isTeacher={this.state.isTeacher}
                      />
                    )}
                  />

                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Course.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
};

export default Course;
