import React from "react";
import api from "../../api/Api";

class CourseHome extends React.Component {
  constructor() {
    super();
    this.state = { page: "" };
  }

  componentWillMount() {
    api.get(`/courses/${this.props.section_id}/home`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ page: response.data.data });
      }
    });
  }

  getHomePage() {
    if (this.state.page === null) return <div className="loading" />;

    if (this.state.page === "")
      return <div>This course doesn't have a main page setup.</div>;

    return this.state.page;
  }

  handleEdit() {
    console.log("Edit pressed");
    // TODO: Edit the course home page.
  }

  getEditControl() {
    return (
      <div className="control">
        <button className="button is-link" onClick={this.handleEdit.bind(this)}>
          <span className="icon">
            <i className="fa fa-pencil" />
          </span>
          <span>Edit</span>
        </button>
      </div>
    );
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
            {this.props.isTeacher && this.getEditControl()}
          </div>
        </nav>

        <div>{this.getHomePage()}</div>
      </div>
    );
  }
}

export default CourseHome;
