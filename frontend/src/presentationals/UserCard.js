import React from "react";
import { Link } from 'react-router-dom';

class UserCard extends React.Component {

  render() {
    return (
		<div>
		  <p>
        <Link to={'/users/' + this.props.id} >
          {this.props.first_name} {this.props.last_name}
        </Link>
      </p>
		  <p>{this.props.email}</p>
      <p>{this.props.id}</p>
      <br></br>
		</div>
    )
  }
}

export default UserCard
