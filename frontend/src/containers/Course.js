import React from "react";
import { Route, Switch } from "react-router-dom";
import api from "../api/Api";

// Small components.
import CourseMenu from "../components/Menu/CourseMenu";
import AddPost from "../components/Form/AddPost";
import AddAssignment from "../components/Form/AddAssignment";
import AddPage from "../components/Form/AddPage";

// Main containers.
import Profile from "./Course/Profile";
import CourseHome from "./Course/CourseHome";
import Announcements from "./Course/Announcements";
import Assignments from "./Course/Assignments";
import Files from "./Course/Files";
import Discussions from "./Course/Discussions";
import Pages from "./Course/Pages";
import Users from "./Course/Users";
import Group from "./Course/Group";
import Groups from "./Course/Groups";
import Settings from "./Course/Settings";
import NotFound from "./NotFound";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { course: [] };
  }

  componentWillMount() {
    api
      .get("/courses/sections/" + this.props.match.params.id)
      .then(response => {
        if (typeof response !== "undefined") {
          this.setState({ course: response.data.data });
        }
      });
  }

  getCourseTitle() {
    if (this.state.course === null || this.state.course.length === 0) {
      return "undefined";
    }

    return this.state.course.code + ": " + this.state.course.name;
  }

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
              <CourseMenu id={this.getCourseId()} />
            </div>
          </div>
          <div className="column">
            <div className="box">
              <div>
                <Switch>
                  <Route
                    exact
                    path="/courses/:id/announcements"
                    component={Announcements}
                  />

                  <Route
                    exact
                    path="/courses/:id/announcements/new"
                    render={props =>(
                      <AddPost id = {this.props.match.params.id} isAnnouncement={true}/>
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/discussions/new"
                    render={props =>(
                      <AddPost id = {this.props.match.params.id} isAnnouncement={false}/>
                    )}
                  />

                  <Route
                    exact
                    path="/courses/:id/assignments/new"
                    component={AddAssignment}
                  />

                  <Route
                    exact
                    path="/courses/:id/pages/new"
                    component={AddPage}
                  />

                  <Route
                    exact
                    path="/courses/:id/assignments"
                    component={Assignments}
                  />

                  <Route
                    exact
                    path="/courses/:id/discussions"
                    component={Discussions}
                  />

                  <Route
                    exact
                    path="/courses/:id/settings"
                    component={Settings}
                  />

                  <Route exact path="/courses/:id/groups" component={Groups} />

                  <Route
                    exact
                    path="/courses/:section_id/groups/:id"
                    component={Group}
                  />

                  <Route exact path="/courses/:id/pages" component={Pages} />

                  <Route exact path="/courses/:id/users" component={Users} />

                  <Route
                    exact
                    path="/courses/:id/users/:user_id"
                    component={Profile}
                  />

                  <Route exact path="/courses/:id/files" component={Files} />

                  <Route exact path="/courses/:id/" component={CourseHome} />

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

export default Dashboard;
