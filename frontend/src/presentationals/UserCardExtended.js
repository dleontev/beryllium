import React from "react";
import { Link } from 'react-router-dom';

class UserCard extends React.Component {

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">
            {this.props.first_name} {this.props.middle_name} {this.props.last_name}
          </h1>
        </div>
        <br/><br/>
        <div className="container">
          <h2 className="subtitle">
            Contact
          </h2>
          {this.props.email}
        </div>
        <br/><br/>
        <div className="container">
          <h2 className="subtitle">
            Enrollments
          </h2>
          &lt;placeholder&gt;
        </div>
      </section>
    )
  }
}

export default UserCard
