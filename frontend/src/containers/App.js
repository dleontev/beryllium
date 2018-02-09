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
// import Inbox from "./Inbox";
import Courses from "./Courses";
import Course from "./Course";
import Account from "./Account";
import NotFound from "./NotFound";
import Chat from "./Chat";

class App extends Component {
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

              <PrivateRoute exact path="/account" component={Account} />

              <PrivateRoute exact path="/courses" component={Courses} />
              <PrivateRoute path="/courses/:id" component={Course} />

              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/inbox" component={Chat} />
              <PrivateRoute exact path="/groups" component={Groups} />

              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      ////////////////////// FAKE AUTH CHECK////////////////////
      localStorage.getItem("token") !== null ? (
     //////////////////////////////////////////////////////////
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default App;
