import React from "react";
import StudentView from "../Groups/StudentView";
import TeacherView from "../Groups/TeacherView";

class Groups extends React.Component {
  constructor() {
    super();
    this.state = {
      userType: "teacher"
    };
  }

  render() {
    return (
      <div>

        {/* FOR DEBUGGING */}
        <div style={{border: '5px solid red'}}>
        <p>Current View: {this.state.userType}</p>
        <button
          onClick={() =>
            this.setState({
              userType:
                this.state.userType === "teacher" ? "student" : "teacher"
            })
          }
        >
          Switch Student/Teacher View
        </button>
        </div>
        {/*--------------*/}

        {this.state.userType === "teacher" ? (
          <TeacherView sectionId={this.props.match.params.id} />
        ) : (
          <StudentView sectionId={this.props.match.params.id} />
        )}
      </div>
    );
  }
}

export default Groups;
