import React from "react";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = { settings: null };
  }

  componentWillMount() {}

  getSettings() {
    if (!this.state.settings) return "This feature is currently not available."
    //return <div className="loading" />;
  }

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

        <div>{this.getSettings()}</div>
      </div>
    );
  }
}

export default Settings;
