import React, { Component } from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import CreateUser from "./CreateUser";
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
=======
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Users from './containers/Users';
import LoginForm from './containers/LoginForm';
import CreateUserForm from './containers/CreateUserForm';
>>>>>>> 1f6f9afaa93742bd288b921af73a7bdce7683798

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
    <Router>
        <div>
          <Route exact path="/user/create" component={CreateUser}/>
        </div>
    </Router>
    );
=======
      <Router>
        <div>
          <Route exact path="/" component={LoginForm}/>
		  <Route path="/users" component={Users}/>
          <Route path="/createuser" component={CreateUserForm}/>
        </div>
      </Router>
    )
>>>>>>> 1f6f9afaa93742bd288b921af73a7bdce7683798
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
)

export default App;