import React, { Component } from "react";
import api from "../../api/Api";
import PostCard from "../../components/PostCard";
import TopAnnouncement from "../../components/TopAnnouncement";
import {Socket} from "phoenix";

class Discussion extends Component {
  constructor() {
    super();
    this.handleViewReplies = this.handleViewReplies.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        this.retrieveChildren();
      });
      this.initSocket();
  }


  handleSubmit(){
    this.channel
			.push("new_comment", {}, 100000)
				.receive("ok", (msg) => {console.log("created message", msg)})
				.receive("error", (reason) => {console.log("create failed", reason)})
        .receive("timeout", () => {console.log("Networking issue...")});
  }

  retrieveChildren(){
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


  /*
    NEW
  */
  initSocket(){
    this.socket = new Socket("ws://localhost:4000/socket", {token: localStorage.getItem("token")});
		this.socket.connect();
    this.channel = this.socket.channel(`notifications:replies${this.props.id}`, {});
    this.channel.on("new_response", (msg) => {
      console.log(`GOT UPDATE`);
      this.handleUpdate();
		});
		this.channel.join()
			.receive("ok", ({messages}) => {
        console.log("Joined!", messages);
      })
			.receive("error", ({reason}) => {console.log("Failed to join!", reason)})
			.receive("timeout", () => {console.log("Networking issue. Still waiting...")});
  }

  componentWillUnmount(){
    this.channel.leave().receive("ok", () => {
			console.log("left");
			this.socket.disconnect();
		});
  }

  handleUpdate(){
    this.retrieveChildren();
  }
   /*
    NEW
  */

  getOpeningPost() {
    if (!this.state.top) return <div className="loading" />;

    if (this.state.top.length === 0) return;

    return (
      <TopAnnouncement
        id={this.state.top.id}
        author_name={this.state.top.author_name}
        updated_at={new Date(this.state.top.updated_at).toLocaleDateString()}
        inserted_at= {new Date(this.state.top.inserted_at).toLocaleDateString()}
        content={this.state.top.content}
        handleViewReplies={this.handleViewReplies}
        hasPosts={this.state.posts.length === 0 ? false : true}
        handleSubmit={this.handleSubmit}
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
          key={post.id}
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
