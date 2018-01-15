import React from "react";
import { Link } from "react-router-dom";

class UserCard extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={"/users/" + this.props.id}>
            {this.props.first_name} {this.props.middle_name}{" "}
            {this.props.last_name}
          </Link>
        </td>
        <td>{this.props.email}</td>
        <td>{this.props.time_zone}</td>
        <td>{this.props.id}</td>
      </tr>
    );
  }
}

export default UserCard;

/*
<div>
  <p>
    <Link to={'/users/' + this.props.id} >
      {this.props.first_name} {this.props.last_name}
    </Link>
  </p>
  <p>{this.props.email}</p>
  <p>{this.props.id}</p>
  <br></br>
</div>*/
