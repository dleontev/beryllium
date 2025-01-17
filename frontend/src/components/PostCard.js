import React from "react";
import profile_image from "../images/blank-profile.png";
import api from "../api/Api";
import ReplyCard from "./ReplyCard";
import ConfirmCard from "./ConfirmCard";
import EditCommentCard from "./EditCommentCard";
import socket from "../api/Socket";
import PropTypes from "prop-types";
class PostCard extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initSocket = this.initSocket.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.closeReplyBox = this.closeReplyBox.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEdited = this.handleEdited.bind(this);
    this.getUpdate = this.getUpdate.bind(this);

    this.state = {
      posts: [],
      length: 0,
      comments: true,
      reply: false,
      modalState: false,
      data: null,
      isLoading: true,
      isPressed: false,
      isEdit: false
    };
  }

  handleClick() {
    if (!this.state.comments === true) {
      this.getReplies();
    } else {
      this.setState({
        comments: !this.state.comments,
        isLoading: true
      });
    }
  }

  handleReply() {
    this.setState({
      reply: !this.state.reply
    });
  }

  handleDelete() {
    this.setState({ isPressed: true });
    if (!this.state.isPressed) {
      if (!this.getDeleted()) {
        api
          .put(`/posts/${this.props.id}`, { post: { is_deleted: true } })
          .then(() => {
            this.handleRefresh();
            this.setState({ isPressed: false, modalState: false });
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }

  handleEdited(newContent) {
    this.handleEdit();
    this.setState({ isPressed: true });
    if (!this.state.isPressed) {
      if (!this.getDeleted()) {
        api
          .put(`/posts/${this.props.id}`, { post: { content: newContent } })
          .then(() => {
            this.handleRefresh();
            this.setState({ isPressed: false });
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }

  handleRefresh() {
    socket.pushChannel(this.sock.channel, "edit_comment", {}, 100000);
  }

  getUpdate() {
    api
      .get(`/posts/discussions/self/${this.props.id}`)
      .then(result => {
        this.setState({
          data: result.data.data
        });
        console.warn(`GOT RESPONSE ${this.state.data.is_deleted}`);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getContent() {
    return this.state.data == null
      ? this.props.content
      : this.state.data.content;
  }

  getDeleted() {
    return this.state.data == null
      ? this.props.is_deleted
      : this.state.data.is_deleted;
  }

  handleEdit() {
    this.setState({ isEdit: !this.state.isEdit });
  }

  handleSubmit() {
    //this.handleRefresh();
    this.setState({
      comments: true
    });
  }

  closeReplyBox() {
    this.setState({
      reply: false
    });
  }

  handleUpdate() {
    this.getReplies();
  }

  getReplies() {
    api
      .get(`/posts/discussions/children/${this.props.id}`)
      .then(response => {
        this.setState({
          posts: response.data.data,
          length: response.data.data.length,
          isLoading: false
        });
        return true;
      })
      .catch(error => {
        console.error(error);
        return false;
      });
    this.setState({
      comments: true
    });
  }

  componentWillMount() {
    this.initSocket();
    this.getReplies();
  }

  componentWillUnmount() {
    socket.leaveChannel(this.sock.channel, this.sock.socket);
  }

  initSocket() {
    this.sock = socket.initSocket(`notifications:replies${this.props.id}`, {});
    socket.onEvent(this.sock.channel, "new_response", this.handleUpdate);
    socket.onEvent(this.sock.channel, "edit_response", this.getUpdate);
  }

  getComments() {
    if (!this.state.posts || this.state.posts.length === 0) return;

    return this.state.posts
      .filter(function(post) {
        return post.parent_id !== null;
      })
      .map(post => (
        <PostCard
          key={post.id}
          {...post}
          updated_at={new Date(post.updated_at).toLocaleDateString()}
          inserted_at={new Date(post.inserted_at).toLocaleDateString()}
          box={false}
          discussion_id={this.props.discussion_id}
          section_id={this.props.section_id}
          isLoading={this.state.isLoading}
          isLocked={this.props.isLocked}
          isTeacher={this.props.isTeacher}
        />
      ));
  }

  render() {
    return (
      <div>
        {this.state.modalState && (
          <ConfirmCard
            onClick={() => this.handleDelete()}
            onCancel={() => {
              this.setState({ modalState: false });
            }}
          />
        )}
        {this.props.isLoading ? (
          <div>
            <div className="loading" /> <br />
          </div>
        ) : (
          <div
            className={this.props.box ? "box" : ""}
            style={{ marginBottom: "10px" }}
          >
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={profile_image} alt="Profile" />
                </p>
              </figure>
              <div className="media-content">
                {this.state.isEdit === false ? (
                  <div>
                    <div className="content">
                      <div>
                        <strong>
                          {this.getDeleted()
                            ? "[DELETED]"
                            : this.props.author_name}
                        </strong>
                        <div className="timestamp">
                          {this.props.inserted_at}
                        </div>
                        <div>
                          {this.getDeleted() ? "[DELETED]" : this.getContent()}
                        </div>
                      </div>
                    </div>

                    <div className="level-left">
                      <div className="field is-grouped">
                        {(!this.props.isLocked ||
                          (this.props.isLocked && this.props.isTeacher)) && (
                          <p className="control">
                            <a
                              className="button is-info is-small"
                              onClick={this.handleReply.bind(this)}
                            >
                              Reply
                            </a>
                          </p>
                        )}

                        {((this.props.user_id === api.getUserId() &&
                          !this.props.isLocked) ||
                          this.props.isTeacher) && (
                          <p className="control">
                            <a
                              className={
                                this.getDeleted()
                                  ? "button is-info is-small is-static"
                                  : "button is-info is-small"
                              }
                              onClick={this.handleEdit}
                            >
                              Edit
                            </a>
                          </p>
                        )}
                        {((this.props.user_id === api.getUserId() &&
                          !this.props.isLocked) ||
                          this.props.isTeacher) && (
                          <p className="control">
                            <a
                              className={
                                this.getDeleted()
                                  ? "button is-danger is-small is-static"
                                  : "button is-danger is-small"
                              }
                              onClick={() => {
                                this.setState({ modalState: true });
                              }}
                            >
                              Delete
                            </a>
                          </p>
                        )}

                        <div className="control">
                          {this.state.length > 0 && (
                            <div
                              className="button is-primary is-small"
                              onClick={this.handleClick.bind(this)}
                            >
                              <span>
                                {this.state.comments ? "Collapse" : "Expand"}
                              </span>
                              <span className="icon">
                                <i className="fa fa-reply" />
                              </span>
                              <span>{this.state.length}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                ) : (
                  <EditCommentCard
                    handleCancelEdit={this.handleEdit}
                    handleEdited={this.handleEdited}
                    content={this.getContent()}
                  />
                )}
                {this.state.reply ? (
                  <ReplyCard
                    handleSubmit={this.handleSubmit}
                    discussion_id={this.props.discussion_id}
                    parent_id={this.props.id}
                    closeReplyBox={this.closeReplyBox}
                  />
                ) : (
                  ""
                )}
                {this.state.comments ? this.getComments() : ""}
              </div>
            </article>
          </div>
        )}
      </div>
    );
  }
}

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  author_name: PropTypes.string.isRequired,
  user_id: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  inserted_at: PropTypes.string.isRequired,
  discussion_id: PropTypes.string.isRequired,
  section_id: PropTypes.string.isRequired,
  is_deleted: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  box: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  isTeacher: PropTypes.bool.isRequired
};

export default PostCard;
