import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Users from './containers/Users';
import LoginForm from './containers/LoginForm';
import CreateUserForm from './containers/CreateUserForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginForm}/>
		      <Route exact path="/users" component={Users}/>
          <Route exact path="/users/create" component={CreateUserForm}/>
        </div>
      </Router>
    )
  }
}

export default App;