import React from "react";

class AnnouncementCard extends React.Component {
  render() {
    return (
      <div className="box">
        <article className="media">
          <div className="media-content">
            <h4 className="title is-5">{this.props.title}</h4>
            <div className="content">
              <p>
                <strong>{this.props.author}</strong>{" "}
                <small>{this.props.inserted_at}</small>
                <br />
                <div className="display-linebreak">{this.props.content}</div>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default AnnouncementCard;
