import React from "react";
import api from "../api/Api";
import CourseMenu from "../components/CourseMenu";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { course: [] };
  }

  componentWillMount() {
    api.get("/courses/" + this.props.match.params.id).then(response => {
      this.setState({ course: response.data.data });
    });

    console.log(this.state.course);
  }

  render() {
    return (
      <div className="container is-fluid">
        <nav class="level">
          <div class="level-left">
            <p className="title is-5">
              {this.state.course.code}: {this.state.course.name}
            </p>
          </div>
        </nav>
        <div className="columns">
          <div className="column is-narrow">
            <div className="box" style={{ width: "200px" }}>
              <CourseMenu />
            </div>
          </div>
          <div className="column">
            <div className="box">&lt;content placeholder&gt;</div>
            <div className="section" />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
