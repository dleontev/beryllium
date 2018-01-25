import React from "react";
import { Link } from "react-router-dom";

class AnnouncementCard extends React.Component {
  render() {
    return (
      <div className="section">
        <Link
          to={`announcements/${this.props.id}`}
          style={{ textDecoration: "none" }}
        >
          <article className="message is-link">
            <div className="message-header">{this.props.title}</div>
            <div className="message-body">
              <p>
                <strong>{this.props.author}</strong>{" "}
                <small>{this.props.inserted_at}</small>
              </p>
              <div className="display-linebreak">{this.props.content}</div>
            </div>
          </article>
        </Link>
      </div>
    );
  }
}

export default AnnouncementCard;
