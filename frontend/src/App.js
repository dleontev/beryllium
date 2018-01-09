import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var axios = require('axios');


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      data: [] //initial state
    }
  }

  componentWillMount(){ //willMount lifecycle hook (lookup on Reactjs documentation), gets called before Component is rendered
    axios.get('http://127.0.0.1:4000').then(response => { //make API call to backend
      this.setState({data: response.data.data}) //call the setState built-in function to set a new state with the results of the query
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
         <div className="users">
           {this.state.data.map(user => { //[array.map iterates over each element in the array and calls an anonymous function passing each element as a parameter
             return <div key={user.id}> id: {user.id}, name: {user.name}</div> //for each element in the array we return this html div element with user id and name
           })}
         </div>
      </div>
    );
  }
}


export default App;
