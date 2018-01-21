import React from "react";
import { Link } from "react-router-dom";

class MainMenu extends React.Component {
  /////////////////// FAKE SIGNOUT fOR TESTING ONLY //////////
  handleSignout(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push("/login");
  }
  ////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="navbar-end">
        <Link to="/account" className="navbar-item">
          <span className="icon">
            <i className="fa fa-user" />
          </span>
          <span>Account</span>
        </Link>
        <Link to="/dashboard" className="navbar-item">
          <span className="icon">
            <i className="fa fa-tachometer" />
          </span>
          <span>Dashboard</span>
        </Link>
        <Link to="/courses" className="navbar-item">
          <span className="icon">
            <i className="fa fa-book" />
          </span>
          <span>Courses</span>
        </Link>
        <Link to="/groups" className="navbar-item">
          <span className="icon">
            <i className="fa fa-users" />
          </span>
          <span>Groups</span>
        </Link>
        <Link to="/inbox" className="navbar-item">
          <span className="icon">
            <i className="fa fa-inbox" />
          </span>
          <span>Inbox</span>
        </Link>

        {/*/////////////////// FOR TESTING ONLY ///////////////////////*/}
        <span className="navbar-item" onClick={this.handleSignout.bind(this)}>
          <a className="button is-info">
            <span className="icon">
              <i className="fa fa-sign-out" />
            </span>
            <span>Sign Out</span>
          </a>
        </span>
        {/*////////////////////////////////////////////////////////////*/}
      </div>
    );
  }
}

export default MainMenu;
