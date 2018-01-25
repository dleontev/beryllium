import React, { Component } from "react";
import api from "../../api/Api";

class Announcement extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className="section">
        <h1 className="title is-4"> {this.props.match.params.discussion_id} </h1>
      </section>
    );
  }
}

export default Announcement;
