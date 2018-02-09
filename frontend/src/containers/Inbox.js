import React from "react";
//import api from "../api/Api";

class Inbox extends React.Component {
  constructor() {
    super();
    this.state = { messages: null };
  }

  componentWillMount() {
    // TODO: Retrieve message threads.
  }

  getMessages() {
    if (this.state.messages === null) return <div className="loading" />;

    if (this.state.messages.length === 0) {
      return "No messages found.";
    }

    // TODO: Display messages.
  }

  render() {
    return (
      <div>
        <nav className="level">
          <div className="level-left">
            <p className="title is-5">Your Inbox</p>
          </div>
        </nav>
        <div className="box">{this.getMessages()}</div>
      </div>
    );
  }
}

export default Inbox;
