import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateUser from "./CreateUser";
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <Route exact path="/user/create" component={CreateUser}/>
        </div>
    </Router>
    );
  }
}

export default App;
