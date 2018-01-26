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
<<<<<<< HEAD
        <h1 className="title is-4"> {this.state.id} SHREK</h1>
=======
        <h1 className="title is-4"> {this.props.match.params.discussion_id} </h1>
>>>>>>> b08be7cc388f3ddedd41d65ad830bee33ec8017f
      </section>
    );
  }
}

export default Announcement;
