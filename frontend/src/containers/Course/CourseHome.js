import React from "react";

class CourseHome extends React.Component {
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
            <h1 className="is-size-4">Course Home</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <button className="button is-link">
                <span className="icon">
                  <i className="fa fa-pencil" />
                </span>
                <span>Edit</span>
              </button>
            </div>
          </div>
        </nav>

        <div>&lt;placeholder&gt;</div>
      </div>
    );
  }
}

export default CourseHome;
