import React, { Component } from "react";
import api from "../../api/Api";
import PostCard from "../../components/PostCard";
import TopAnnouncement from "../../components/TopAnnouncement";

class Discussion extends Component {
  constructor() {
    super();
    this.handleViewReplies = this.handleViewReplies.bind(this);
    this.getChildren = this.getChildren.bind(this);
    this.state = {
      top: null,
      posts: [],
      replies: true
    };
  }
  
  componentWillMount() {
    api
      .get(`/posts/${this.props.match.params.discussion_id}`)
      .then(response => {
        if (typeof response !== "undefined") {
          console.log(response.data.data);
          this.setState({ top: response.data.data });
        }
      }).then(()=>{
        this.getChildren();
      });
  }


  getChildren(){
    api
      .get(`/posts/discussions/children/${this.state.top.id}`)
      .then(response =>{
        this.setState({
          posts: response.data.data
        });
        return true;
      }).catch(error => {
        console.log(error);
        return false;
      });
  }

  handleViewReplies(true_false){
    this.setState({replies: true_false});
  }

  getOpeningPost() {
    if (!this.state.top) return <div className="loading" />;

    if (this.state.top.length === 0) return;

    return (
      /*
      <PostCard
        id={this.state.posts[0].id}
        author_name={this.state.posts[0].author_name}
        updated_at={this.state.posts[0].updated_at}
        inserted_at={this.state.posts[0].inserted_at}
        content={this.state.posts[0].content}
      />
      */
      <TopAnnouncement
        id={this.state.top.id}
        author_name={this.state.top.author_name}
        updated_at={new Date(this.state.top.updated_at).toLocaleDateString()}
        inserted_at= {new Date(this.state.top.inserted_at).toLocaleDateString()}
        content={this.state.top.content}
        handleViewReplies={this.handleViewReplies}
        hasPosts={this.state.posts.length === 0 ? false : true}
        handleGetChildren={this.getChildren}
        discussion_id = {this.props.match.params.discussion_id}
      />
    );
  }

  getReplies() {
    if (!this.state.posts || this.state.posts.length === 0) return;

    return this.state.posts
      .filter(function(post) {
        return post.parent_id !== null;
      })
      .map((post, index) => (
        <PostCard
          key={index}
          id={post.id}
          author_name={post.author_name}
          updated_at={new Date(post.updated_at).toLocaleDateString()}
          inserted_at={new Date(post.inserted_at).toLocaleDateString()}
          content={post.content}
          box={true}
          discussion_id = {this.props.match.params.discussion_id}
          section_id = {this.props.match.params.id}
        />
      ));
  }

  render() {
    // Shitty design for debugging.
    return (
      <section className="section">
        {this.getOpeningPost()}
        <br />
        {this.state.replies ? this.getReplies() : ""}
      </section>
    );
  }
}

export default Discussion;
