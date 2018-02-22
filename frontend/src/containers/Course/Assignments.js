import React from "react";
import api from "../../api/Api";
import AssignmentTableCard from "../../components/AssignmentTableCard";
import { Link } from "react-router-dom";
import moment from "moment";

class Assignments extends React.Component {
  constructor() {
    super();
    this.state = { 
      assignments: null 
    };
  }

  componentWillMount() {
    api
      .get(`/assignments/sections/${this.props.section_id}`)
      .then(response => {
        if (typeof response !== "undefined") {
          this.setState({ assignments: response.data.data });
        }
      })
      .catch((error) =>{
        console.log(`Assignments.js: ${error}`);
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
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Scope</th>
          </tr>
        </thead>
        <tbody>{this.getAssignments()}</tbody>
      </table>
    );
  }

  getAssignments() {
    return this.state.assignments.map((value, index) => (
      <AssignmentTableCard
        key={value.id}
        id={value.id}
        name={value.title}
        content={
          value.content.length > 100
          ? value.content.substring(0, 100) + "[...]"
          : value.content
        }
        type={value.type}
        group_id={value.group_id}
        due_at = {moment(value.due_at).format("dddd, MMMM Do YYYY, h:mm a")}
        section_id = {this.props.section_id}
      />
    ));
  }

  getAddAssignmentButton() {
    return (
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
    );
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
            {this.props.isTeacher && this.getAddAssignmentButton()}
          </div>
        </nav>

        <div>{this.getAssignmentTable()}</div>
      </div>
    );
  }
}

export default Assignments;
