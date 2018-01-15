import React from "react";

class UserCard extends React.Component {

  render() {
    return (
		<div>
		  <p>{this.props.first_name}</p>
		  <p>{this.props.email}</p>
		</div>
    )
  }
}

export default UserCard
