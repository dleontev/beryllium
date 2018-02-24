import React from "react";
import { Socket } from "phoenix";

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
    this.socketInit = this.socketInit.bind(this);
  }

  componentWillMount() {
    this.socketInit();
  }

  componentWillUnmount() {
    this.channel.leave().receive("ok", () => {
      console.log("left");
      this.socket.disconnect();
    });
  }

  socketInit() {
    this.socket = new Socket("ws://localhost:4000/socket", {});
    this.socket.connect();
    this.channel = this.socket.channel("room:lobby", {});
    this.channel
      .join()
      .receive("ok", ({ messages }) => {
        console.log("Joined!", messages);
      })
      .receive("error", ({ reason }) => {
        console.log("Failed to join!", reason);
      })
      .receive("timeout", () => {
        console.log("Networking issue. Still waiting...");
      });
    this.channel.on("new_msg", msg => {
      console.log(`GOT ${msg.some}`);
    });
  }

  handleSend(event) {
    this.channel
      .push("new_msg", { body: this.state.message }, 10000)
      .receive("ok", msg => {
        console.log("created message", msg);
      })
      .receive("error", reason => {
        console.log("create failed", reason);
      })
      .receive("timeout", () => {
        console.log("Networking issue...");
      });
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    return (
      <div className="box">
        <div className="field">
          <label className="label">Message</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Textarea"
              onChange={this.handleChange.bind(this)}
            />
          </div>
        </div>
        <div className="control">
          <button
            className="button is-link"
            onClick={this.handleSend.bind(this)}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
