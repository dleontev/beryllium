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
  user_name: PropTypes.string.isRequired

}

export default SubmissionTableCard;