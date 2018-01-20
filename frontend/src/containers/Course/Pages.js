import React from "react";
import { Link } from "react-router-dom";

class Pages extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}

  render() {
    ///////////////// FOR TESTING ONLY /////////////////////
    var pages = null;

    if (pages == null) {
      pages = "No pages found.";
    }
    ///////////////////////////////////////////////////////

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Pages</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="pages/new">
                <button className="button is-link">+Page</button>
              </Link>
            </div>
          </div>
        </nav>

        <div>{pages}</div>
      </div>
    );
  }
}

export default Pages;
