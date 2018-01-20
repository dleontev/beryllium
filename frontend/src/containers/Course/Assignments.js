import React from "react";
import { Link } from "react-router-dom";

class Assignments extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}

  render() {
    ///////////////// FOR TESTING ONLY /////////////////////
    var assignments = null;

    if (assignments == null) {
      assignments = "No assignments found.";
    }
    ///////////////////////////////////////////////////////

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Assignments</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="assignments/new">
                <button className="button is-link">+Assignment</button>
              </Link>
            </div>
          </div>
        </nav>

        <div>{assignments}</div>
      </div>
    );
  }
}

export default Assignments;
