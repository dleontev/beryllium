import React from "react";

class CourseHome extends React.Component {
  constructor() {
    super();
    this.state = { page: -1 };
  }

  componentWillMount() {
    // TODO: Load the main page of the course.
  }

  getHomePage() {
    if (!this.state.page) return <div className="loading" />;

    if (this.state.page === -1)
      return <div>This course doesn't have a main page setup.</div>;
  }

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

        <div>{this.getHomePage()}</div>
      </div>
    );
  }
}

export default CourseHome;
