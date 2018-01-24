import React from "react";
import { Link } from "react-router-dom";

class AnnouncementCard extends React.Component {
  render() {
    return (
        <article className="message is-link">
          <div className="message-header">
            <Link className="title is-5" to={`${this.props.is_discussion == true ? "discussions" : "announcements"}/${this.props.id}`} style={{textDecoration: 'none'}}>{this.props.title}</Link>
            <button className="delete"></button>
          </div>
          <div className="message-body">
            <p>
              <strong>{this.props.author}</strong>{" "}
              <small>{this.props.inserted_at}</small>
            </p>
              <div className="display-linebreak">{this.props.content}</div>
            </div>
        </article>
    );
  }
}

export default AnnouncementCard;
