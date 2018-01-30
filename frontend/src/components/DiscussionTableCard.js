import React from "react";

class DiscussionTableCard extends React.Component {
  render() {
    return (
      <article className="post">
        <h4>{this.props.title}</h4>
        <span className="pull-right has-text-grey-light">
          <i className="fa fa-comments" /> {this.props.reply_count}
        </span>
        <div className="media">
          <div className="media-content">
            <div className="content">
              <p>{this.props.author}</p>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default DiscussionTableCard;
