import React from "react";
import { Link } from "react-router-dom";

class Discussions extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}

  render() {
    ///////////////// FOR TESTING ONLY /////////////////////
    var discussions = null;

    if (discussions == null) {
      discussions = "No discussions found.";
    }
    ///////////////////////////////////////////////////////

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Discussions</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="discussions/new">
                <button className="button is-link">+Discussion</button>
              </Link>
            </div>
          </div>
        </nav>

        <div>{discussions}</div>
      </div>
    );
  }
}

export default Discussions;
