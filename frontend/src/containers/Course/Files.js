import React from "react";
import { Link } from "react-router-dom";

class Files extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}

  render() {
    ///////////////// FOR TESTING ONLY /////////////////////
    var files = null;

    if (files == null) {
      files = "No files found.";
    }
    ///////////////////////////////////////////////////////

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Files</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="files/new">
                <button className="button is-link">Upload</button>
              </Link>
            </div>
          </div>
        </nav>

        <div>{files}</div>
      </div>
    );
  }
}

export default Files;
