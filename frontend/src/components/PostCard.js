import React from "react";
import { Link } from "react-router-dom";
import ConfirmCard from "./ConfirmCard";
import api from "../api/Api";

class PostCard extends React.Component {
  constructor(){
    super();
    this.state = {
      posts: [],
      length: 0,
      replies: false
    }
  }


  handleClick(event){
    this.setState({
      replies: !this.state.replies
    });
  }

  componentWillMount(){
    api
      .get(`/posts/discussions/children/${this.props.id}`)
      .then(response =>{
        this.setState({
          posts: response.data.data,
          length: response.data.data.length
        });
        return true;
      }).catch(error => {
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
            <img src="https://bulma.io/images/placeholders/128x128.png"/>
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong> {this.props.author_name} </strong>
              <br/>
              {this.props.inserted_at} 
              <br/>
                {this.props.content}
              <br/>
              <small>
                <a className="button is-success is-small">
                  Like
                </a> 
                   
                <a className="button is-info is-small"> 
                  Reply 
                </a> 
                   
                <a className={this.state.length == 0 ? "button is-danger is-small is-static" : "button is-primary is-small"} onClick={this.handleClick.bind(this)}> 
                  <span> 
                    {this.state.replies ? "Collapse" : "Expand"} 
                  </span>
                  <span className="icon"> 
                    <i className="fa fa-reply"></i> 
                  </span> 
                  <span> 
                    {this.state.length} 
                  </span> 
                </a> 
              </small>
            </p>
          </div>
          <br/>
          {this.state.replies ? this.getReplies() : ""}
        </div>
      </article>
    </div>
      

    );
  }
}

export default PostCard;
