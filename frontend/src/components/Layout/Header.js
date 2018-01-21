import React from "react";
import { Link } from "react-router-dom";

import MainMenu from "../Menu/MainMenu";

class Header extends React.Component {
  getMainMenu() {
    if (localStorage.getItem("token") === null) {
      return null;
    }

    return <MainMenu />;
  }

  render() {
    return (
      <nav className="navbar is-link">
        <div className="navbar-brand">
          <h1 className="is-size-4">
            <Link to="/">
              <div className="navbar-item">
                <span className="logo-text">
                  <div className="logo-border">Be</div>ryllium
                </span>
              </div>
            </Link>
          </h1>

          <div className="navbar-burger" data-target="navMenu">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="navbar-menu">{this.getMainMenu()}</div>
      </nav>
    );
  }
}

export default Header;
