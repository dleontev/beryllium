import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

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
  /*//////////// INCOMPLETE AUTHENTICATION CHECK /////*/
  checkAuthentication() {
    if (localStorage.getItem("token") === null) return <Redirect to="/login" />;

    return;
  }
  /*/////////////////////////////////////////////////*/

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="section">
            <Switch>
              <Route exact path="/" component={Login} />

              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              {/*//////////// INCOMPLETE AUTHENTICATION CHECK /////*/}
              {this.checkAuthentication()}
              {/*/////////////////////////////////////////////////*/}

              <Route exact path="/account" component={Account} />

              <Route exact path="/courses" component={Courses} />
              <Route path="/courses/:id" component={Course} />

              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/inbox" component={Inbox} />
              <Route exact path="/groups" component={Groups} />

              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
