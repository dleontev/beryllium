import React from "react";
import {Socket} from "../../node_modules/phoenix/priv/static/phoenix";

class DiscussionTableCard extends React.Component { 
  constructor(){
    super();
    this.initSocket = this.initSocket.bind(this);
    this.state = {
      totalReplies: ""
    }
  }
  componentDidMount(){
    this.initSocket();
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
    this.channel = this.socket.channel(`notifications:${this.props.id}`, {});
    this.channel.on("new_response", (msg) => {
      console.log(`GOT UPDATE`);
      this.setState({
        totalReplies: this.state.totalReplies + 1
      })
		});
		this.channel.join()
			.receive("ok", ({messages}) => {
        console.log("Joined!", messages);
        this.channel
          .push("get_responses", {body: this.props.id}, 10000)
            .receive("ok", (msg) => {console.log("created message", msg);
                                      this.setState({totalReplies: msg.amount})})
            .receive("error", (reason) => {console.log("create failed", reason)})
            .receive("timeout", () => {console.log("Networking issue...")});
      })
			.receive("error", ({reason}) => {console.log("Failed to join!", reason)})
			.receive("timeout", () => {console.log("Networking issue. Still waiting...")});
  }

  render() {
    return (
      <article className="post">
        <h4>{this.props.title}</h4>
        <span className="pull-right has-text-grey-light">
          <i className="fa fa-comments" /> {this.state.totalReplies}
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
