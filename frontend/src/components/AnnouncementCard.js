import React from "react";
import { Link } from "react-router-dom";

class AnnouncementCard extends React.Component {
  render() {
    return (
      <Link to={`announcements/${this.props.id}`}>
        <article className="message is-link">
          <div className="message-header">
            <div className="levels">
              <div className="level-left">{this.props.title}</div>
            </div>
            <div className="level-left">
              <div class="field is-grouped">
                <p class="control">
                  <a class="button">
                    <span class="icon">
                      <i class="fa fa-trash-o fa-lg" />
                    </span>
                  </a>
                </p>
                <p class="control">
                  <a class="button">
                    <span class="icon">
                      <i class="fa fa-lock fa-lg" />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="message-body">
            <p>
              <strong>{this.props.author}</strong>{" "}
              <small>{this.props.inserted_at}</small>
            </p>
            <div>{this.props.content}</div>
          </div>
        </article>
      </Link>
    );
  }
}

export default AnnouncementCard;
