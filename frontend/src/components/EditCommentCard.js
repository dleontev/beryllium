import React from "react";
import PropTypes from "prop-types";

class EditCommentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.content
    };
  }

  handleText(event) {
    this.setState({
      data: event.target.value
    });
  }

  handleSubmit() {
    if (this.state.data.length === 0) {
      alert("Message cannot be empty");
    } else {
      this.props.handleEdited(this.state.data);
    }
  }

  render() {
    return (
      <div>
        <div className="field">
          <p className="control">
            <textarea
              autoFocus
              className="textarea"
              onChange={this.handleText.bind(this)}
              value={this.state.data}
            />
          </p>
        </div>
        <div className="level-left">
          <div className="field is-grouped">
            <p className="control">
              <a
                className="button is-info is-small"
                onClick={this.props.handleCancelEdit}
              >
                Cancel
              </a>
            </p>

            <p className="control">
              <a
                className="button is-success is-small"
                onClick={this.handleSubmit.bind(this)}
              >
                Save
              </a>
            </p>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

EditCommentCard.propTypes = {
  content: PropTypes.string.isRequired,
  handleEdited: PropTypes.func.isRequired,
  handleCancelEdit: PropTypes.func.isRequired
};

export default EditCommentCard;
