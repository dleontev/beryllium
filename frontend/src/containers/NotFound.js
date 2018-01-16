import React from "react";

class NotFound extends React.Component {
  render() {
    return (
      <div class="notification is-danger">
        <h2>Page Not Found: {window.location.pathname}.</h2>
      </div>
    );
  }
}

export default NotFound;
