import React, { Component } from "react";
import api from "../../api/Api";
import PostCard from "../../components/PostCard";

class Discussion extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentWillMount() {
    api.get(`/posts/discussions/${this.props.match.params.discussion_id}`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ posts: response.data.data });
      }
    });
  }

  getPosts() {
    if (this.state.posts.length === 0) {
      return "No posts found.";
    }

    return this.state.posts.map((post, index) => (
      <PostCard
        key={index}
        id={post.id}
      />
    ));
  }

  render() {
    return (
      <section className="section">
        <h1 className="title is-4">
          Discussion/Announcement ID: {this.props.match.params.discussion_id}{" "}
        </h1>
        <br />
        <h2 className="title is-4">Posts:</h2>
        <br/>
        {this.getPosts()}
      </section>
    );
  }
}

export default Discussion;
