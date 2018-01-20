import React from "react";
import api from "../api/Api";
import GroupTableCard from "../components/GroupTableCard";

class Groups extends React.Component {
  constructor() {
    super();
    this.state = { groups: [] };
  }

  componentWillMount() {
    api.get(`/groups/user/all`).then(response => {
      this.setState({ groups: response.data.data });
    });
  }

  render() {
    const groups = this.state.groups.map((group, index) => {
      return (
        <GroupTableCard
          key={index}
          group_id={group.group_id}
          group_name={group.group_name}
          course_code={group.course_code}
          course_name={group.course_name}
          section_id={group.section_id}
        />
      );
    });

    return (
      <div>
        <nav className="level">
          <div className="level-left">
            <p className="title is-5">Your Groups</p>
          </div>
        </nav>
        <div className="box">
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Group</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>{groups}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Groups;
