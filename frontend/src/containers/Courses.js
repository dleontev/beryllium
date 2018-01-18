import React from "react";
import api from "../api/Api";
import CourseCard from "../components/CourseCard";
import axios from "axios";

class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }


  componentWillMount(){
    var config = {
      headers: {
        "Authorization": "Bearer "+ localStorage.getItem('token')
      }
    }
    axios.get("http://localhost:4000/api/courses", config).then(response => {
      console.log(response);
      this.setState({courses: response.data.data});
    });
  }

  render() {
    const courses = this.state.courses.map((course, index)=> {
      return (
        <CourseCard
          key = {index}
          name = {course.name}
          start_date = {course.start_date}
          end_date = {course.end_date}
        />
      );
    });

    return(
    <div>
      <div className="box">
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>{courses}</tbody>
          </table>
        </div>  
    </div>
    );
  }
}

export default Courses;
