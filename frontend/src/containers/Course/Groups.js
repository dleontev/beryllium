import React from "react";
//import api from "../../api/Api";
import { Link } from "react-router-dom";

class Groups extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Groups</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="groups/new">
                <button className="button is-link">Add Group</button>
              </Link>
            </div>
          </div>
        </nav>

        <div>..placeholder..</div>
      </div>
    );
  }
}

export default Groups;
