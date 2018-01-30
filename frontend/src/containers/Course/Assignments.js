import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";

class Assignments extends React.Component {
  constructor() {
    super();
    this.state = { assignments: null };
  }

  componentWillMount() {
    api
      .get(`/assignments/sections/${this.props.match.params.id}`)
      .then(response => {
        if (typeof response !== "undefined") {
          this.setState({ assignments: response.data.data });
        }
      });
  }

  getAssignmentTable() {
    if (!this.state.assignments) return <div className="loading" />;

    if (this.state.assignments.length === 0) {
      return "There are no assignments to show.";
    }

    return (
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{this.getAssignments()}</tbody>
      </table>
    );
  }

  getAssignments() {
    // TODO: Get assignment list.
  }

  render() {
    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Assignments</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="assignments/new">
                <button className="button is-link">
                  <span className="icon">
                    <i className="fa fa-plus-circle" />
                  </span>
                  <span>Assignment</span>
                </button>
              </Link>
            </div>
          </div>
        </nav>

        <div>{this.getAssignmentTable()}</div>
      </div>
    );
  }
}

export default Assignments;
