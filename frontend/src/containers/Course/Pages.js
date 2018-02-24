import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//import api from "../../api/Api";

class Pages extends React.Component {
  constructor() {
    super();
    this.state = { pages: null };
  }

  componentWillMount() {
    // api.get(`/pages/sections/${this.props.match.params.id}`).then(response => {
    //   if (typeof response !== "undefined") {
    //     this.setState({ assignments: response.data.data });
    //   }
    // });
  }

  getPages() {
    // TODO: Remove placeholder.
    if (!this.state.pages) return "This feature is currently not available.";
    //return <div className="loading" />;

    if (this.state.pages.length === 0) {
      return "There are no pages to show.";
    }

    // TODO: Get list of pages.
    return (
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody />
      </table>
    );
  }

  getAddPageButton() {
    return (
      <div className="control">
        <Link to="pages/new">
          <button className="button is-link">
            <span className="icon">
              <i className="fa fa-plus-circle" />
            </span>
            <span>Page</span>
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Pages</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            {this.props.isTeacher && this.getAddPageButton()}
          </div>
        </nav>

        <div>{this.getPages()}</div>
      </div>
    );
  }
}

Pages.propTypes = {
  isTeacher: PropTypes.bool
};

export default Pages;
