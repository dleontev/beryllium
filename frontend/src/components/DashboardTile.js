import React from "react";

class DashboardTile extends React.Component {
  render() {
    return (
      <div className="tile is-parent">
        <article className="tile is-child notification is-info">
          <p className="title">{this.props.course_code}</p>
          <p className="subtitle">{this.props.course_name}</p>
          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </div>
        </article>
      </div>
    );
  }
}

export default DashboardTile;
