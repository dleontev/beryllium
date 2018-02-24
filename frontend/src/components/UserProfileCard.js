import React from "react";
import PropTypes from "prop-types";

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
            <h1 className="title">{this.props.name}</h1>
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

UserProfileCard.propTypes = {
  email: PropTypes.string.isRequired,
  profile_image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired
};

export default UserProfileCard;
