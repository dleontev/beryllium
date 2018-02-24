import React from "react";
import api from "../../api/Api";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        section_id: this.props.section_id,
        is_discussion: this.props.is_discussion,
        title: "",
        message: ""
      },
      finish: false,
      cancel: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.data.title.length === 0) {
      alert("Please, enter a valid title.");
      return;
    } else if (this.state.data.message.length === 0) {
      alert("Please, enter a valid content.");
      return;
    }

    api.post(`/posts/`, this.state.data).then(() => {
      this.setState({ finish: true });
    });
  }

  handleTitle(event) {
    var data = Object.assign({}, this.state.data);
    data.title = event.target.value;
    this.setState({ data });
  }

  handleMessage(event) {
    var data = Object.assign({}, this.state.data);
    data.message = event.target.value;
    this.setState({ data });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ finish: true });
  }

  render() {
    if (this.state.finish) {
      if (this.props.is_discussion) {
        return (
          <Redirect to={`/courses/${this.props.section_id}/discussions`} />
        );
      } else {
        return (
          <Redirect to={`/courses/${this.props.section_id}/announcements`} />
        );
      }
    }

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">
              {this.props.is_discussion
                ? "Add a new discussion"
                : "Add a new announcement"}
            </h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            {this.props.isTeacher && this.getEditControl()}
          </div>
        </nav>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <div className="control">
              <input
                placeholder="Title"
                className="input"
                type="text"
                onChange={this.handleTitle.bind(this)}
                autoFocus
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <textarea
                placeholder="Message"
                className="textarea"
                onChange={this.handleMessage.bind(this)}
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
      </div>
    );
  }
}

AddPost.propTypes = {
  section_id: PropTypes.string.isRequired,
  isTeacher: PropTypes.bool.isRequired,
  is_discussion: PropTypes.bool.isRequired
};

export default AddPost;
