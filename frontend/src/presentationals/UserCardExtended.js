import React from "react";
import logo from "../img/blank-profile.png";

class UserCard extends React.Component {
  render() {
    return (
      <section className="section">
        <figure class="image is-128x128">
          <img src={logo} className="profile-image" alt="Change profile"/>
        </figure>
        <br />
        <div className="container">
          <h1 className="title">
            {this.props.first_name} {this.props.middle_name}{" "}
            {this.props.last_name}
          </h1>
        </div>
        <br />
        <div className="container">
          <h2 className="subtitle">Contact</h2>
          <li>{this.props.email}</li>
        </div>
        <br />
        <div className="container">
          <h2 className="subtitle">Enrollments</h2>
          <li>&lt;placeholder&gt;</li>
        </div>
      </section>
    );
  }
}

export default UserCard;
