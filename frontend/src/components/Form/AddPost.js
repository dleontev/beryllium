import React from "react";
import api from "../../api/Api";
import { Redirect } from "react-router-dom";

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
    if (this.state.title.length !== 0 && this.state.message.length !== 0) {
      api.post(`/posts/`, this.state.data).then(response => {
        this.setState({ finish: true });
      });
    }
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
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <div className="control">
            <input
              placeholder="Title"
              className="input"
              type="text"
              onChange={this.handleTitle.bind(this)}
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
    );
  }
}

export default AddPost;
