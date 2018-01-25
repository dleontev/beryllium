import React from "react";
import { Link } from "react-router-dom";

class DiscussionTableCard extends React.Component {
  render() {
    return (
      <tr>
        <td><Link to={`discussions/${this.props.id}`} style={{textDecoration: "none"}}>
                {this.props.title}
            </Link>
        </td>
        <td>{this.props.author}</td>
        <td>{this.props.inserted_at}</td>
        <td>{this.props.content}</td>        
      </tr>
    );
  }
}

export default DiscussionTableCard;