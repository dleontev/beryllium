import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
class Files extends React.Component {
  constructor() {
    super();
    this.state = { files: null };
  }

  componentWillMount() {}

  getFiles() {
    // TODO: Remove placeholder.
    if (!this.state.files) return "This feature is currently not available.";
    //return <div className="loading" />;
  }

  getUploadButton() {
    return (
      <div className="control">
        <Link to="files/new">
          <button className="button is-link">
            <span className="icon">
              <i className="fa fa-upload" />
            </span>
            <span>Upload</span>
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
            <h1 className="is-size-4">Files</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            {this.props.isTeacher && this.getUploadButton()}
          </div>
        </nav>

        <div>{this.getFiles()}</div>
      </div>
    );
  }
}

Files.propTypes = {
  isTeacher: PropTypes.bool
};

export default Files;
