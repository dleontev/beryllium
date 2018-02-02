import React from "react";
import profile_image from "../images/blank-profile.png";
import api from "../api/Api";
import ReplyCard from "./ReplyCard";

class PostCard extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      posts: [],
      length: 0,
      comments: false,
      reply: false
    };
  }

  handleClick(event) {
    this.setState({
      comments: !this.state.comments
    });
  }

  handleReply(event){
    this.setState({
      reply: !this.state.reply
    });
  }


  handleSubmit(){
    this.setState({
      reply: !this.state.reply
    });
    this.getReplies();
    this.setState({
      comments: true
    });
  }

  getReplies(){
    api
      .get(`/posts/discussions/children/${this.props.id}`)
      .then(response => {
        this.setState({
          posts: response.data.data,
          length: response.data.data.length
        });
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  componentWillMount() {
    this.getReplies();
  }

  getComments() {
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
          box={false}
          discussion_id = {this.props.discussion_id}
          section_id = {this.props.section_id}
        />
      ));
  }

  render() {
    return (
      <div className={this.props.box ? "box" : ""}>
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={profile_image} alt="Profile" />
            </p>
          </figure>

          <div className="media-content">
            <div className="content">
              <div>
                <strong> {this.props.author_name}</strong>
                <div className="timestamp">{this.props.inserted_at}</div>
                <div>{this.props.content}</div>
              </div>
            </div>

            <div className="level-left">
              <div className="field is-grouped">
                <p className="control">
                  <button className="button is-success is-small">Like</button>
                </p>

                <p className="control">
                  <a className="button is-info is-small" onClick={this.handleReply.bind(this)}>Reply</a>
                </p>

                <div className="control">
                  <div
                    className={
                      this.state.length === 0
                        ? "button is-danger is-small is-static"
                        : "button is-primary is-small"
                    }
                    onClick={this.handleClick.bind(this)}
                  >
                    <span>{this.state.comments ? "Collapse" : "Expand"}</span>
                    <span className="icon">
                      <i className="fa fa-reply" />
                    </span>
                    <span>{this.state.length}</span>
                  </div>
                </div>
              </div>
              <br />
            </div>
            {this.state.reply ? <ReplyCard 
                                    handleSubmit={this.handleSubmit} 
                                    discussion_id={this.props.discussion_id} 
                                    parent_id = {this.props.id}/> : ""}
            {this.state.comments ? this.getComments() : ""}
          </div>
        </article>
      </div>
    );
  }
}

export default PostCard;
