import React from "react";
import api from "../../api/Api";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        content: ""
      },
      finish: false,
      cancel: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.title);
    console.log(this.state.content);

    if (this.state.title.length === 0) {
      alert("Please, enter a valid page title.");
      return;
    } else if (this.state.content.length === 0) {
      alert("Please, enter a valid page content.");
      return;
    }

    api
      .post(`/pages/`, {
        page: {
          title: this.state.title,
          section_id: this.props.section_id,
          content: this.state.content
        }
      })
      .then(() => {
        this.setState({ finish: true });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value
    }));
  }

  handleMessage(value) {
    this.setState({ content: value });
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ finish: true });
  }

  render() {
    if (this.state.finish) {
      return <Redirect to={`/courses/${this.props.section_id}/pages`} />;
    }

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Add a new course page</h1>
          </div>
        </nav>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <div className="control">
              <input
                placeholder="Title"
                className="input"
                type="text"
                name="title"
                onChange={this.handleChange.bind(this)}
                autoFocus
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <ReactQuill
                placeholder={"Enter the page contents here... "}
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

AddPage.propTypes = {
  section_id: PropTypes.string.isRequired
};

export default AddPage;
