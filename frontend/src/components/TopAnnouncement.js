import React from "react";
import ReplyCard from "./ReplyCard";
import {Socket} from "phoenix";
//import api from "../api/Api";

class TopAnnouncement extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeReplyBox = this.closeReplyBox.bind(this);
    this.state = {
      data: false,
      reply: false
    };
  }

  componentWillMount(){
    this.initSocket();
  }

  initSocket(){
    this.socket = new Socket("ws://localhost:4000/socket", {token: localStorage.getItem("token")});
		this.socket.connect();
    this.channel = this.socket.channel(`notifications:replies${this.props.id}`, {});
    this.channel.on("new_response", (msg) => {
      console.log(`GOT UPDATE TOP ANNOUNCEMENT`);
      this.handleUpdate();
    });
    this.channel.on("edit_response", (msg) => {
      console.log(`GOT UPDATE`);
      this.getUpdate();
		});
		this.channel.join()
			.receive("ok", ({messages}) => {
        console.log("TOP ANNOUNCEMENT JOINED", messages);
      })
			.receive("error", ({reason}) => {console.log("Failed to join!", reason)})
			.receive("timeout", () => {console.log("Networking issue. Still waiting...")});
  }

  handleUpdate(){
    this.props.retrieveChildren();
  }


  handleClick() {
    this.setState({
      data: !this.state.data
    });
    this.props.handleViewReplies(this.state.data);
  }


  handleReply() {
    console.log("Reply");
    this.setState({
      reply: !this.state.reply
    });
  }


  closeReplyBox(){
    this.setState({
      reply: !this.state.reply
    });
  }


  handleSubmit(){
    this.setState({
      data: false
    });
    this.props.handleSubmit();
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <strong>{this.props.author_name}</strong>
          <div className="timestamp">{this.props.inserted_at}</div>
          <br />
          {this.props.content}
        </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              <span>
                <button
                  className="button"
                  onClick={this.handleReply.bind(this)}
                >
                  <span className="icon">
                    <i
                      className="fa fa-reply"
                    />
                  </span>
                  <span>
                    Reply
                  </span>
                </button>
              </span>
            </p>
            {this.props.hasPosts === true ? (
            <p className="card-footer-item">
              <span>
                <button
                  className="button"
                  onClick={this.handleClick.bind(this)}
                >
                  <span className="icon">
                    <i
                      className={this.state.data ? "fa fa-plus" : "fa fa-minus"}
                    />
                  </span>
                  <span>
                    {!this.state.data ? "Collapse Replies" : "View Replies"}
                  </span>
                </button>
              </span>
            </p>
            ) : null}
          </footer>
        {this.state.reply ?
        <div className="random">
           <ReplyCard 
            handleSubmit={this.handleSubmit} 
            discussion_id={this.props.discussion_id} 
            parent_id={this.props.id} 
            closeReplyBox = {this.closeReplyBox}/>
        </div>
        : ""}
      </div>
    );
  }
}

export default TopAnnouncement;
