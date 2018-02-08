import React from "react";
import { Link } from "react-router-dom";
import MainMenu from "../Menu/MainMenu";

document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

class Header extends React.Component {
 
  getMainMenu() {
    ///////////////////////// FAKE AUTH CHECK /////////////
    if (localStorage.getItem("token") === null) {
      return null;
    }
    //////////////////////////////////////////////////////

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

          <div className="navbar-burger" data-target="navMenu" onClick={this.handleBurger}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="navbar-menu" id="navMenu" >{this.getMainMenu()}</div>
      </nav>
    );
  }
}

export default Header;
