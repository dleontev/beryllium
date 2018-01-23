import React from "react";

class UserProfileCard extends React.Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <figure className="image is-128x128">
            <img
              src={this.props.profile_image}
              className="profile-image"
              alt="Change profile"
            />
          </figure>
          <br />
          <div className="container">
            <h1 className="title">
              {this.props.first_name} {this.props.middle_name}{" "}
              {this.props.last_name}
            </h1>
          </div>
        </div>
        <br />
        <div className="container">
          <h2 className="subtitle">Contact</h2>
          <li>{this.props.email}</li>
        </div>
        <br />
        <div className="container">
          <h2 className="subtitle">Enrollments</h2>
          {this.props.courses}
        </div>
      </section>
    );
  }
}

export default UserProfileCard;
