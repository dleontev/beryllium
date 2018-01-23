import React from "react";

class DashboardTile extends React.Component {
  render() {
    return (
      <div className="tile is-vertical is-4">
        <article className="tile is-child notification is-link">
          <p className="title">{this.props.course_code}</p>
          <p className="subtitle">{this.props.course_name}</p>
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </div>
        </article>
        <br/>
      </div>
    );
  }
}

export default DashboardTile;
