import React, { Component } from "react";
//import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./containers/Header";
import Users from "./containers/Users";
import Profile from "./containers/Profile";
import Login from "./containers/Login";
import CreateUser from "./containers/CreateUser";
import Dashboard from "./containers/Dashboard";
import Groups from "./containers/Groups";
import Inbox from "./containers/Inbox";
import Courses from "./containers/Courses";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div>
            <section className="section">
              <div className="container">
                <Route exact path="/" component={Login} />
                <Route exact path="/users/:id" component={Profile} />
                <Route exact path="/users/" component={Users} />
                <Route exact path="/register" component={CreateUser} />
                <Route exact path="/courses" component={Courses} />                
                <Route exact path="/dashboard" component={Dashboard} />                
                <Route exact path="/inbox" component={Inbox} />                
                <Route exact path="/groups" component={Groups} />                
              </div>
            </section>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
