import React, { Component } from "react";
import api from "../../api/Api";
import PostCard from "../../components/PostCard";
import TopAnnouncement from "../../components/TopAnnouncement";
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from "prop-types";
class Posts extends Component {
  constructor(props) {
    super(props);
    this.handleViewReplies = this.handleViewReplies.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveChildren = this.retrieveChildren.bind(this);
    this.state = {
      top: null,
      posts: [],
      replies: true,
      isLoading: true,
      discussion: null
    };
  }

  componentWillMount() {
    api
      .get(`/discussions/${this.props.match.params.discussion_id}`)
      .then(response => {
        if (typeof response !== "undefined") {
          this.setState({ discussion: response.data.data });
        }
      })
      .then(() => {
        api
          .get(`/posts/${this.props.match.params.discussion_id}`)
          .then(response => {
            if (typeof response !== "undefined") {
              this.setState({ top: response.data.data });
            }
          })
          .then(() => {
            this.retrieveChildren();
          });
      });
  }

  retrieveChildren() {
    api
      .get(`/posts/discussions/children/${this.state.top.id}`)
      .then(response => {
        this.setState({
          posts: response.data.data,
          isLoading: false
        });
        return true;
      })
      .catch(error => {
        alert(error)
        return false;
      });
    this.setState({
      replies: true
    });
  }

  handleSubmit() {
    this.setState({
      replies: true
    });
  }

  handleViewReplies(true_false) {
    if (true_false === true) {
      this.retrieveChildren();
    } else {
      this.setState({
        replies: true_false,
        isLoading: true
      });
    }
  }

  getOpeningPost() {
    if (!this.state.top) return <div className="loading" />;

    if (this.state.top.length === 0) return;

    return (
      <TopAnnouncement
        id={this.state.top.id}
        author_name={this.state.top.author_name}
        updated_at={new Date(this.state.top.updated_at).toLocaleDateString()}
        inserted_at={new Date(this.state.top.inserted_at).toLocaleDateString()}
        content={this.state.top.content}
        handleSubmit={this.handleSubmit}
        handleViewReplies={this.handleViewReplies}
        hasPosts={this.state.posts.length === 0 ? false : true}
        discussion_id={this.props.match.params.discussion_id}
        retrieveChildren={this.retrieveChildren}
        isLocked={this.state.discussion.is_locked}
        title={this.state.discussion.title}
        isTeacher={this.props.isTeacher}
      />
    );
  }

  getReplies() {
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
          box={true}
          discussion_id={this.props.match.params.discussion_id}
          section_id={this.props.match.params.id}
          isLoading={this.state.isLoading}
          isLocked={this.state.discussion.is_locked}
          isTeacher={this.props.isTeacher}
        />
      ));
  }

  render() {
    return (
      <div>
        {this.getOpeningPost()} <br />
        {this.state.replies ? this.getReplies() : ""}
      </div>
    );
  }
}

Posts.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  isTeacher: PropTypes.bool
};

export default Posts;
