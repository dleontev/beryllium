import React from "react";
import api from "../../api/Api";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";

class CourseHome extends React.Component {
  constructor() {
    super();
    this.state = {
      pageId: null,
      content: "",
      newContent: "",
      editing: false
    };
  }

  componentWillMount() {
    api.get(`/courses/${this.props.section_id}/home`).then(response => {
      if (typeof response !== "undefined") {
        console.log(response.data.data);

        const page = response.data.data;

        this.setState({
          pageId: page.id,
          content: page.content,
          newContent: page.content
        });
      }
    });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ newContent: this.state.content, editing: false });
  }

  handleMessage(value) {
    this.setState({ newContent: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newContent.length === 0) {
      alert("Please, enter a valid page content.");
      return;
    }

    if (this.state.pageId === null) {
      // TODO: Create a new page.
      api
        .post(`/pages/`, {
          page: {
            content: this.state.content
          }
        })
        .then(() => {
          this.setState({ editing: false });
        });
    } else {
      api
        .put(`/pages/`, {
          page: {
            content: this.state.content
          }
        })
        .then(() => {
          this.setState({ editing: false });
        });
    }
  }

  getHomePage() {
    if (this.state.content === null) return <div className="loading" />;

    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <div className="control">
              <ReactQuill

                onChange={this.handleMessage.bind(this)}
                value={this.state.newContent}
                autoFocus
              />
            </div>
          </div>
          <div className="level-right">
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-light"
                  value="Cancel"
                  onClick={this.handleCancel.bind(this)}
                >
                  Cancel
                </button>
              </div>
              <div className="control">
                <button className="button is-link" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    } else {
      if (this.state.content === "") {
        return "This course doesn't have a main page setup.";
      } else {
        return this.state.content;
      }
    }
  }

  handleEdit() {
    this.setState({ editing: true });
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
            {this.props.isTeacher &&
              !this.state.editing &&
              this.getEditControl()}
          </div>
        </nav>

        <div>{this.getHomePage()}</div>
      </div>
    );
  }
}

CourseHome.propTypes = {
  isTeacher: PropTypes.bool,
  section_id: PropTypes.string.isRequired
};

export default CourseHome;
