import React from "react";
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <section className="hero is-link">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <span className="navbar-burger burger" data-target="navbarMenuHeroB">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenuHeroB" className="navbar-menu">
                <div className="navbar-end">
                  <Link to="/" className="navbar-item">
                    <span className="icon">
                      <i className="fa fa-user"></i>
                    </span>
                    <span>Account</span>
                  </Link>
                  <Link to="/" className="navbar-item">
                    <span className="icon">
                      <i className="fa fa-tachometer"></i>
                    </span>
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/courses" className="navbar-item">
                    <span className="icon">
                      <i className="fa fa-book"></i>
                    </span>
                    <span>Courses</span>
                  </Link>
                  <Link to="/users" className="navbar-item">
                    <span className="icon">
                      <i class="fa fa-address-card-o" aria-hidden="true"></i>
                    </span>
                    <span>Users</span>
                  </Link>
                  <Link to="/" className="navbar-item">
                    <span className="icon">
                      <i className="fa fa-users"></i>
                    </span>
                    <span>Groups</span>
                  </Link>
                  <Link to="/" className="navbar-item">
                    <span className="icon">
                      <i className="fa fa-inbox"></i>
                    </span>
                    <span>Inbox</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              <Link to="/">Beryllium</Link>
              </h1>
            <h2 className="subtitle">
              A learning management system.
              </h2>
          </div>
        </div>
      </section>
    )
  }
}

export default Header