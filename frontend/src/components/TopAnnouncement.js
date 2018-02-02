import React from "react";
import { Link } from "react-router-dom";
import ConfirmCard from "./ConfirmCard";
import ReplyCard from "./ReplyCard";
//import api from "../api/Api";

class TopAnnouncement extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: false,
      reply: false
    };
  }

  handleClick() {
    this.setState({
      data: !this.state.data
    });
    this.props.handleViewReplies(this.state.data);
  }


  handleReply(){
    console.log("Reply");
    this.setState({
      reply: !this.state.reply
    });
  }


  handleSubmit(){
    this.setState({
      reply: !this.state.reply
    });
    this.setState({
      data: false
    });
    this.props.handleGetChildren();
    this.props.handleViewReplies(!this.state.data);
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
           <ReplyCard handleSubmit={this.handleSubmit} discussion_id={this.props.discussion_id} parent_id={this.props.id}/>
        </div>
        : ""}
      </div>
    );
  }
}

export default TopAnnouncement;
