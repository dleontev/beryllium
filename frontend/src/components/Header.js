import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {

  /////////////////// FOR TESTING ONLY ////////////////////////
  handleSignout(event) {
    event.preventDefault();
    localStorage.removeItem('token')
  }
  ////////////////////////////////////////////////////////////

  render() {
    var headerMenu;

    /////////////////// FOR TESTING ONLY ////////////////////////
    if (localStorage.getItem("token") !== null) {
    /////////////////////////////////////////////////////////////
      headerMenu = (
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
    } else {
      headerMenu = null;
    }

    return (
      <section className="hero is-link">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <span
                  className="navbar-burger burger"
                  data-target="navbarMenuHeroB"
                >
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div id="navbarMenuHeroB" className="navbar-menu">
                {headerMenu}
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              <Link to="/">
                <div className="logo-border">Be</div>ryllium
              </Link>
            </h1>
            <h2 className="subtitle">A learning management system.</h2>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;
