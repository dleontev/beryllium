import React from "react";
import api from "../api/Api";
import PropTypes from "prop-types";
import SubmissionTableCard from "../components/SubmissionTableCard";
import moment from "moment";

class Submissions extends React.Component {
  constructor(){
    super();
    this.state = {
      submissions: null,
      isLoading: true,
      search: "",
      sorted: false
    }
  }

  componentWillMount(){
    var submission_type = this.props.isTeacher === true ? "all" : "individual";
    api.get(`/submissions/assignments/${this.props.assignment_id}/${submission_type}`)
      .then((response) =>{
        console.log(response.data.data);
        this.setState({submissions: response.data.data}, ()=>{
          var submissions = Object.assign([], this.state.submissions);
          submissions.sort((a,b)=>{
            return (new moment(b.inserted_at) - new moment(a.inserted_at));
          });
          this.setState({submissions: submissions, sorted: true});
        });
      })
      .catch((error) =>{
        console.log(`Submissions.js: ${error}`);
      })
  }

  getSubmissions(){
    if(this.state.submissions.length !== 0){
      return this.state.submissions.filter((value) => {
        return value.user_name.toLowerCase().includes(this.state.search.toLowerCase());
      }).map((value) => (
        <SubmissionTableCard
          key={value.id}
          {...value}
          due_at={this.props.due_at}
        />
      ));
    }
  }

  handleSearch(event){
		this.setState({
			search: event.target.value
		})
	}

  render(){
    if(this.state.submissions === null){
      return (
        <div className="loading">
        </div>
      );
    }else if(this.state.submissions.length === 0){
      return <div> There are no submissions... </div>;
    }
    
    return (
      <div>
        <div className="field">
          <div className="control">
            <input className="input is-info" type="text" placeholder="Search people" onChange={this.handleSearch.bind(this)}/>
          </div>
        </div>
        <br/>
        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Student</th>
              <th>Submitted At</th>
              <th>Text Entry</th>
              <th>File Upload</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{this.getSubmissions()}</tbody>
        </table>
      </div>
    );
  }
}

Submissions.propTypes = {
  isTeacher: PropTypes.bool.isRequired,
  assignment_id: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  due_at: PropTypes.string.isRequired
}

export default Submissions;