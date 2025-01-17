import React from "react";
import ReplyCard from "./ReplyCard";
import socket from "../api/Socket";
import PropTypes from "prop-types";
class TopAnnouncement extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeReplyBox = this.closeReplyBox.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    //this.getUpdate = this.getUpdate.bind(this);
    this.state = {
      data: false,
      reply: false
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket() {
    this.sock = socket.initSocket(`notifications:replies${this.props.id}`, {});
    socket.onEvent(this.sock.channel, "new_response", this.handleUpdate);
    //socket.onEvent(this.sock.channel, "edit_response", this.getUpdate);
  }

  handleUpdate() {
    this.props.retrieveChildren();
  }

  handleClick() {
    this.setState({
      data: !this.state.data
    });
    this.props.handleViewReplies(this.state.data);
  }

  handleReply() {
    this.setState({
      reply: !this.state.reply
    });
  }

  closeReplyBox() {
    this.setState({
      reply: !this.state.reply
    });
  }

  handleSubmit() {
    this.setState({
      data: false
    });
    this.props.handleSubmit();
  }

  createMarkup() {
    return {__html: this.props.content};
  }

  getContent(){
    return <div className="content" dangerouslySetInnerHTML={this.createMarkup()}/>
  }

  render() {
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{this.props.title}</p>
          <div className="card-header-icon">
            {this.props.isLocked && (
              <span className="icon">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
            )}
          </div>
        </header>
        <div className="card-content">
          <strong>{this.props.author_name}</strong>
          <div className="timestamp">{this.props.inserted_at}</div>
          <br />
          <br />
          {this.getContent()}
        </div>
        <footer className="card-footer">
          {(!this.props.isLocked || this.props.isTeacher) && (
            <p className="card-footer-item">
              <span>
                <button
                  className="button"
                  onClick={this.handleReply.bind(this)}
                >
                  <span className="icon">
                    <i className="fa fa-reply" />
                  </span>
                  <span>Reply</span>
                </button>
              </span>
            </p>
          )}
          {this.props.hasPosts === true && (
            <p className="card-footer-item">
              <span>
                <button
                  className="button"
                  onClick={this.handleClick.bind(this)}
                >
                  <span className="icon">
                    <i
                      className={this.state.data ? "fa fa-plus" : "fa fa-minus"}
                    />
                  </span>
                  <span>
                    {!this.state.data ? "Collapse Replies" : "View Replies"}
                  </span>
                </button>
              </span>
            </p>
          )}
        </footer>
        {this.state.reply && (
          <div className="random">
            <ReplyCard
              handleSubmit={this.handleSubmit}
              discussion_id={this.props.discussion_id}
              parent_id={this.props.id}
              closeReplyBox={this.closeReplyBox}
            />
          </div>
        )}
      </div>
    );
  }
}

TopAnnouncement.propTypes = {
  id: PropTypes.string.isRequired,
  author_name: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  inserted_at: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  discussion_id: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleViewReplies: PropTypes.func.isRequired,
  hasPosts: PropTypes.bool.isRequired,
  retrieveChildren: PropTypes.func.isRequired,
  isLocked: PropTypes.bool.isRequired,
  isTeacher: PropTypes.bool.isRequired
};

export default TopAnnouncement;
