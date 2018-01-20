import React from "react";
import { Link } from "react-router-dom";

class Announcements extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}

  render() {
    ///////////////// FOR TESTING ONLY /////////////////////
    var announcements = null;

    if (announcements == null) {
      announcements = "No announcements found.";
    }
    ////////////////////////////////////////////////////////

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Announcements</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="announcements/new">
                <button className="button is-link">+Announcement</button>
              </Link>
            </div>
          </div>
        </nav>

        <div>{announcements}</div>
      </div>
    );
  }
}

export default Announcements;
