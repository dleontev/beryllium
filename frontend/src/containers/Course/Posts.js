import React, { Component } from "react";
import api from "../../api/Api";
import PostCard from "../../components/PostCard";

class Discussion extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentWillMount() {
    api
      .get(`/posts/discussions/${this.props.match.params.discussion_id}`)
      .then(response => {
        if (typeof response !== "undefined") {
          this.setState({ posts: response.data.data });
        }
      });
  }

  getOpeningPost() {
    if (this.state.posts.length === 0) return;

    return (
      <PostCard
        id={this.state.posts[0].id}
        author_name={this.state.posts[0].author_name}
        updated_at={this.state.posts[0].updated_at}
        inserted_at={this.state.posts[0].inserted_at}
        content={this.state.posts[0].content}
      />
    );
  }

  getReplies() {
    if (this.state.posts.length === 0) return;

    return this.state.posts
      .filter(function(post) {
        return post.parent_id !== null;
      })
      .map((post, index) => (
        <PostCard
          key={index}
          id={post.id}
          author_name={post.author_name}
          updated_at={post.updated_at}
          inserted_at={post.inserted_at}
          content={post.content}
        />
      ));
  }

  render() {
    // Shitty design for debugging.
    return (
      <section className="section">
        <h1 className="title is-4">
          Discussion/Announcement ID: {this.props.match.params.discussion_id}{" "}
        </h1>
        <br />
        <h2 className="title is-4">Opening post:</h2>
        {this.getOpeningPost()}
        <br />
        <h2 className="title is-4">Replies:</h2>
        <br />
        {this.getReplies()}
      </section>
    );
  }
}

export default Discussion;
