import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Users from './containers/Users';
import Profile from './containers/Profile';
import Login from './containers/Login';
import Header from './containers/Header';
import CreateUser from './containers/CreateUser';


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
              </div>
            </section>
          </div>
        </div>
      </Router>


    )
  }
}

export default App;