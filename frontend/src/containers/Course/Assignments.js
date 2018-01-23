import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import AssignmentCard from "../../components/AnnouncementCard";

class Assignments extends React.Component {
  constructor() {
    super();
    this.state = { assignments: [] };
  }

  componentWillMount() {
    api
      .get("/assignments/sections/" + this.props.match.params.id)
      .then(response => {
        if (typeof response !== "undefined") {
          this.setState({ assignments: response.data.data });
        }
      });
  }

  getAssignmentTable() {
    if (this.state.assignments.length === 0) {
      return "No assignments found.";
    }

    return (
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{this.getCourseAssignments()}</tbody>
      </table>
    );
  }

  getCourseAssignments() {
    return this.state.assignments.map((assignment, index) => (
      <AssignmentCard key={index} id={assignment.id} />
    ));
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
                <button className="button is-link">+Assignment</button>
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
