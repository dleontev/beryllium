<<<<<<< HEAD
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Users from './containers/Users';
import LoginForm from './containers/LoginForm';
import CreateUserForm from './containers/CreateUserForm';
=======
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
>>>>>>> 181022910e57d5bc6f566adfb4d445958fd57d01

class App extends Component {
  render() {
    return (
      <Router>
        <div>
<<<<<<< HEAD
          <Route exact path="/" component={LoginForm}/>
		      <Route path="/users" component={Users}/>
          <Route path="/createuser" component={CreateUserForm}/>
=======
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
>>>>>>> 181022910e57d5bc6f566adfb4d445958fd57d01
        </div>
      </Router>
    );
  }
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 181022910e57d5bc6f566adfb4d445958fd57d01
