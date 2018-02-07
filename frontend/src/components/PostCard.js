import React from "react";
import profile_image from "../images/blank-profile.png";
import api from "../api/Api";
import ReplyCard from "./ReplyCard";
import ConfirmCard from "./ConfirmCard";
import EditCommentCard from "./EditCommentCard";
import {Socket} from "phoenix";

class PostCard extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initSocket = this.initSocket.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.closeReplyBox = this.closeReplyBox.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      posts: [],
      length: 0,
      comments: true,
      reply: false,
      modalState: "modal",
      data: null,
      isLoading: true,
      isPressed: false,
      isEdit: false
    };
  }

  handleClick(event) {
    if(!this.state.comments === true){
      this.getReplies();
    }else{
      this.setState({
        comments: !this.state.comments,
        isLoading: true
      });
    }
  }

  handleReply(event){
    this.setState({
      reply: !this.state.reply
    });
  }

  ///////////////////MODAL STUFF////////////////////////////////
  handleModal() {
    this.setState({
      modalState:
        this.state.modalState === "modal" ? "modal is-active" : "modal"
    });
  }

  handleDelete() {
    this.handleModal();
    this.setState({isPressed: true});
    if(!this.state.isPressed){
      if(!this.getDeleted()){
        api
          .put(`/posts/${this.props.id}`, {post: {is_deleted: true}})
          .then(() => {
            this.handleRefresh();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

  handleRefresh(){
    this.channel
			.push("edit_comment", {}, 100000)
				.receive("ok", (msg) => {console.log("created message", msg)})
				.receive("error", (reason) => {console.log("create failed", reason)})
        .receive("timeout", () => {console.log("Networking issue...")});
  }

  getUpdate(){
    api
      .get(`/posts/discussions/self/${this.props.id}`)
      .then(result => {
        this.setState({
          data: result.data.data
        });
        console.log(`GOT RESPONSE ${this.state.data.is_deleted}`);
      })
      .catch(error =>{
        console.log(error);
      });
  }

/*
  getAuthor(){
    return this.state.data == null ? this.props.author_name : this.state.data.author_name;
  }

  getInsertedAt(){
    return this.state.data == null ? new Date(this.props.inserted_at).toLocaleDateString() : new Date(this.state.data.inserted_at).toLocaleDateString();
  }
*/

  getContent(){
    return this.state.data == null ? this.props.content : this.state.data.content;
  }

  getDeleted(){
    return this.state.data == null ? this.props.is_deleted : this.state.data.is_deleted;
  }
  ///////////////////MODAL STUFF////////////////////////////////


  ////////////////////EDIT STUFF///////////////////////////
  handleEdit(){
    this.setState({isEdit: !this.state.isEdit});
  }

  ///////////////////EDIT STUFF///////////////////////////

  handleSubmit(){
    this.handleRefresh();
    this.setState({
      comments: true
    });
  }

  closeReplyBox(){
    this.setState({
      reply: false
    });
  }

  handleUpdate(){  
    this.getReplies();
  }

  getReplies(){
    api
      .get(`/posts/discussions/children/${this.props.id}`)
      .then(response => {
        console.log(response.data.data)
        this.setState({
          posts: response.data.data,
          length: response.data.data.length,
          isLoading: false
        });
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
      this.setState({
        comments: true
      })
  }

  componentWillMount() {
    this.initSocket();
    this.getReplies();
  }

  componentWillUnmount(){
    this.channel.leave().receive("ok", () => {
			console.log("left");
			this.socket.disconnect();
		});
  }

  initSocket(){
    this.socket = new Socket("ws://localhost:4000/socket", {token: localStorage.getItem("token")});
		this.socket.connect();
    this.channel = this.socket.channel(`notifications:replies${this.props.id}`, {});
    this.channel.on("new_response", (msg) => {
      console.log(`GOT UPDATE`);
      this.handleUpdate();
    });
    this.channel.on("edit_response", (msg) => {
      console.log(`GOT UPDATE`);
      this.getUpdate();
		});
		this.channel.join()
			.receive("ok", ({messages}) => {
        console.log("Joined!", messages);
      })
			.receive("error", ({reason}) => {console.log("Failed to join!", reason)})
			.receive("timeout", () => {console.log("Networking issue. Still waiting...")});
  }

  getComments() {
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
          user_id={post.user_id}
          is_deleted={post.is_deleted}
          updated_at={new Date(post.updated_at).toLocaleDateString()}
          inserted_at={new Date(post.inserted_at).toLocaleDateString()}
          content={post.content}
          box={false}
          discussion_id = {this.props.discussion_id}
          section_id = {this.props.section_id}
          isLoading = {this.state.isLoading}
        />
      ));
  }

  render() {
    return (
      <div>
        <ConfirmCard
          modalToggle={this.state.modalState}
          onClick={() => this.handleDelete()}
          onCancel={() => this.handleModal()}
        />
        {this.props.isLoading
        ?
        <div><div className="loading"></div> <br/> </div>
        :
        <div className={this.props.box ? "box" : ""}>
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={profile_image} alt="Profile" />
              </p>
            </figure>
            <div className="media-content">
              {this.state.isEdit === false ?
              <div>
              <div className="content">
                <div>
                  <strong> {this.getDeleted() ? "[DELETED]" : this.props.author_name} </strong>
                  <div className="timestamp">{this.props.inserted_at}</div>
                  <div>{this.getDeleted() ? "[DELETED]" : this.getContent()}</div>
                </div>
              </div>

              <div className="level-left">
                <div className="field is-grouped">

                  <p className="control">
                    <a className="button is-info is-small" onClick={this.handleReply.bind(this)}>Reply</a>
                  </p>
                  

                  {this.props.user_id === api.getUserId() ?
                    <p className="control">
                      <a className={this.getDeleted() ? "button is-info is-small is-static" : "button is-info is-small"} onClick={this.handleEdit}> Edit </a>
                    </p>
                  : ""
                  }
                  {this.props.user_id === api.getUserId() ?
                    <p className="control">
                      <a className={this.getDeleted() ? "button is-danger is-small is-static" : "button is-danger is-small"} onClick={this.handleModal} >Delete</a>
                    </p>
                  : ""
                  }

                  <div className="control">
                    <div
                      className={
                        this.state.length === 0
                          ? "button is-primary is-small is-static"
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
              </div>
              : <EditCommentCard
                handleCancelEdit = {this.handleEdit}
                content = {this.getContent()}
              />}
              {this.state.reply ? <ReplyCard 
                                      handleSubmit={this.handleSubmit} 
                                      discussion_id={this.props.discussion_id} 
                                      parent_id = {this.props.id}
                                      closeReplyBox = {this.closeReplyBox}/>
                                      : ""}
              {this.state.comments ? this.getComments() : ""}
            </div>
          </article>
        </div>
        }
      </div>
    );
  }
}

export default PostCard;
