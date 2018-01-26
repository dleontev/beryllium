import React from "react";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Settings</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end" />
        </nav>

        <div>&lt;placeholder&gt;</div>
      </div>
    );
  }
}

export default Settings;
