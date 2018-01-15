import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateUser from "./CreateUser";
class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateUser></CreateUser>
      </div>
    );
  }
}

export default App;
