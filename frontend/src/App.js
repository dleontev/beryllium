import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Users from './containers/Users';
import Form from './containers/Form';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Users}/>
          <Route path="/create" component={Form}/>
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