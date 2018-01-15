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
		  <Route path="/users" component={Users}/>
          <Route path="/createuser" component={CreateUserForm}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
)

export default App;