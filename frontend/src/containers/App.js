import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Users from "./Users";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Groups from "./Groups";
import Inbox from "./Inbox";
import Courses from "./Courses";
import Course from "./Course";
import Account from "./Account";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div>
            <section className="section">
              <div className="container is-fluid">
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/account" component={Account} />

                  <Route exact path="/users/" component={Users} />
                  <Route path="/users/:id" component={Profile} />

                  <Route exact path="/register" component={Register} />

                  <Route exact path="/courses" component={Courses} />
                  <Route path="/courses/:id" component={Course} />

                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/inbox" component={Inbox} />
                  <Route exact path="/groups" component={Groups} />

                  <Route component={NotFound} />
                </Switch>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
