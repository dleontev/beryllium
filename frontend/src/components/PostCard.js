import React from "react";
//import { Link } from "react-router-dom";
//import ConfirmCard from "./ConfirmCard";
import profile_image from "../images/blank-profile.png";
import api from "../api/Api";

class PostCard extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      length: 0,
      replies: false
    };
  }

  handleClick(event) {
    this.setState({
      replies: !this.state.replies
    });
  }

  componentWillMount() {
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
          box={false}
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
              <p>
                <strong> {this.props.author_name} </strong>
                <br />
                <small>{this.props.inserted_at}</small>
                <br />
                {this.props.content}
                <br />
              </p>
            </div>

            <div className="level-left">
              <div className="field is-grouped">
                <p className="control">
                  <button className="button is-success is-small">Like</button>
                </p>

                <p className="control">
                  <a className="button is-info is-small">Reply</a>
                </p>

                <p className="control">
                  <div
                    className={
                      this.state.length === 0
                        ? "button is-danger is-small is-static"
                        : "button is-primary is-small"
                    }
                    onClick={this.handleClick.bind(this)}
                  >
                    <span>{this.state.replies ? "Collapse" : "Expand"}</span>
                    <span className="icon">
                      <i className="fa fa-reply" />
                    </span>
                    <span>{this.state.length}</span>
                  </div>
                </p>
              </div>
              <br />
            </div>
            {this.state.replies ? this.getReplies() : ""}
          </div>
        </article>
      </div>
    );
  }
}

export default PostCard;
