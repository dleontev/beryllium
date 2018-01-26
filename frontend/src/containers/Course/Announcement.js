import React, { Component } from "react";
import api from "../../api/Api";

class Announcement extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <section className="section">
        <h1 className="title is-4"> {this.state.id} SHREK</h1>        
      </section>
    );
  }
}

export default Announcement;
