import React from "react";
import { Link } from "react-router-dom";
import api from "../api/Api";
import GroupTableCard from "../components/GroupTableCard";

class Groups extends React.Component {
  constructor() {
    super();
    this.state = { groups: [] };
  }

  componentWillMount() {
    api.get(`/groups/user/all`).then(response => {
      if (typeof response !== "undefined") {
        this.setState({ groups: response.data.data });
      }
    });
  }

  getUserGroupsTable() {
    if (this.state.groups.length === 0) {
      return "No groups found.";
    }

    return (
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Group</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>{this.getUserGroups()}</tbody>
      </table>
    );
  }

  getUserGroups() {
    return this.state.groups.map((group, index) => {
      return (
        <GroupTableCard
          key={index}
          group_id={group.group_id}
          group_link={
            <Link
              to={"/courses/" + group.section_id + "/groups/" + group.group_id}
            >
              {group.group_name}
            </Link>
          }
          course_name={group.course_code + ": " + group.course_name}
          section_id={group.section_id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <nav className="level">
          <div className="level-left">
            <p className="title is-5">Your Groups</p>
          </div>
        </nav>
        <div className="box">{this.getUserGroupsTable()}</div>
      </div>
    );
  }
}

export default Groups;
