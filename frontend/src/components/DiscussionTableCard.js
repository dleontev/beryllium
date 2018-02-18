import React from "react";
import socket from "../api/Socket";

class DiscussionTableCard extends React.Component {
  constructor() {
    super();
    this.initSocket = this.initSocket.bind(this);
    this.afterJoin = this.afterJoin.bind(this);
    this.incrementResponses = this.incrementResponses.bind(this);
    this.setReplies = this.setReplies.bind(this);
    this.state = {
      totalReplies: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  componentWillUnmount() {
    socket.leaveChannel(this.sock.channel, this.sock.socket);
  }

  afterJoin(msg) {
    socket.pushChannel(
      this.sock.channel,
      "get_responses",
      { body: this.props.id },
      10000,
      this.setReplies
    );
  }

  setReplies(msg) {
    this.setState({ totalReplies: msg.amount });
  }

  incrementResponses() {
    this.setState({ totalReplies: this.state.totalReplies + 1 });
  }

  initSocket() {
    this.sock = socket.initSocket(
      `notifications:discussion${this.props.id}`,
      {},
      this.afterJoin
    );
    socket.onEvent(this.sock.channel, "new_response", this.incrementResponses);
  }

  render() {
    return (
      <article className="post">
        {this.props.title}
        <span className="pull-right">
          <i className="fa fa-comments" />&nbsp;{this.state.totalReplies}
        </span>
        <div className="media">
          <div className="media-content">
            <div className="content">
              <p>{this.props.author}</p>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default DiscussionTableCard;
