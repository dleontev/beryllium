import React from "react";
import StudentView from "../Groups/StudentView";
import TeacherView from "../Groups/TeacherView";
import PropTypes from "prop-types";

class Groups extends React.Component {
  render() {
    if (this.props.isTeacher === null) return <div />;

    return this.props.isTeacher === true ? (
      <TeacherView sectionId={this.props.section_id} />
    ) : (
      <StudentView sectionId={this.props.section_id} />
    );
  }
}

Groups.propTypes = {
  isTeacher: PropTypes.bool,
  section_id: PropTypes.string.isRequired
};

export default Groups;
