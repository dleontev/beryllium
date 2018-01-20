import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import api from "../api/Api";

import CourseMenu from "../components/Menu/CourseMenu";
import AddPost from "../components/Form/AddPost";
import AddAssignment from "../components/Form/AddAssignment";
import AddPage from "../components/Form/AddPage";

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
        this.setState({ course: response.data.data });
      });
  }

  render() {
    return (
      <div>
        <nav className="level">
          <div className="level-left">
            <p className="title is-5">
              {this.state.course.code}: {this.state.course.name}
            </p>
          </div>
        </nav>
        <div className="columns">
          <div className="column is-narrow">
            <div className="box" style={{ width: "200px" }}>
              <CourseMenu id={this.props.match.params.id} />
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
                    component={AddPost}
                  />

                  <Route
                    exact
                    path="/courses/:id/discussions/new"
                    component={AddPost}
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
