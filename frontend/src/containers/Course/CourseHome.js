import React from "react";
import api from "../../api/Api";

class CourseHome extends React.Component {
  constructor() {
    super();
    this.state = { page: "" };
  }

  componentWillMount() {
    api.get(`/courses/${this.props.match.params.id}/home`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ user: response.data.data });
      }
    });
  }

  getHomePage() {
    if (this.state.page === null) return <div className="loading" />;

    if (this.state.page === "")
      return <div>This course doesn't have a main page setup.</div>;

    return this.state.page;
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
