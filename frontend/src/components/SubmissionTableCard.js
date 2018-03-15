import React from 'react';
import PropTypes from "prop-types";
import moment from "moment";

class SubmissionTableCard extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }

  getLocal(){
    var utc_time = moment.utc(this.props.inserted_at);
    var local_time = moment(utc_time).local();
    return local_time.format("dddd, MMMM Do YYYY, h:mm a");
  }

  getStatus(){
    var utc_time_submission = moment.utc(this.props.inserted_at);
    var submission_time = moment(utc_time_submission).local();
    var due_time = moment(this.props.due_at);
    //console.log(`Submissions time: ${submission_time.format("dddd, MMMM Do YYYY, h:mm a")} Due time: ${due_time.format("dddd, MMMM Do YYYY, h:mm a")}`);
    if(submission_time > due_time){
      return <span className="has-text-danger">Late</span>;
    }else{
      return <span className="has-text-success">On Time</span>;
    }
  }

  render(){
    return (
      <tr>
        <td>{this.props.user_name}</td>
        <td>{this.getLocal()}</td>
        <td>{this.props.text_entry !== null ? 
          <span className="icon has-text-success"><i className="fa fa-check"></i></span>:
          <span className="icon has-text-danger"><i className="fa fa-times"></i></span>}
        </td>
        <td>{this.props.file_id !== null ? 
          <span className="icon has-text-success"><i className="fa fa-check"></i></span>:
          <span className="icon has-text-danger"><i className="fa fa-times"></i></span>}
        </td>
        <td>{this.props.points_earned === null ? "Not Graded" : `${this.props.points_earned} / ${this.props.points_possible}`}</td>
        <td>{this.getStatus()}</td>
      </tr>
    );
  }
}

SubmissionTableCard.propTypes = {
  inserted_at: PropTypes.string.isRequired,
  text_entry: PropTypes.string,
  file_id: PropTypes.string,
  points_earned: PropTypes.number,
  points_possible: PropTypes.number.isRequired,
  user_name: PropTypes.string.isRequired,
  due_at: PropTypes.string.isRequired

}

export default SubmissionTableCard;