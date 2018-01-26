import React from "react";

class PostCard extends React.Component {
  render() {
    return <li>{this.props.id},{this.props.author_name},{this.props.inserted_at},{this.props.updated_at}</li>;
  }
}

export default PostCard;
