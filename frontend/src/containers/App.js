import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Users from "./Users";
import Profile from "./Profile";
import Login from "./Login";
import CreateUser from "./CreateUser";
import Dashboard from "./Dashboard";
import Groups from "./Groups";
import Inbox from "./Inbox";
import Courses from "./Courses";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div>
            <section className="section">
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/users/" component={Users} />
                  <Route path="/users/:id" component={Profile} />
                  <Route exact path="/register" component={CreateUser} />
                  <Route exact path="/courses" component={Courses} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/inbox" component={Inbox} />
                  <Route exact path="/groups" component={Groups} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </section>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
