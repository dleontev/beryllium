import React from "react";

class PostCard extends React.Component {
  render() {
    return (
      // Shitty design for debuggings.
      <div>
        <li>
          <p>{this.props.id}</p>
          <p>{this.props.author_name}</p>
          <p>{this.props.inserted_at}</p>
          <p>{this.props.updated_at}</p>
          <p>{this.props.content}</p>
        </li>
        <br />
      </div>
    );
  }
}

export default PostCard;
