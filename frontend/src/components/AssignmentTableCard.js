import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api/Api";


class AssignmentTableCard extends React.Component {
  constructor(){
    super();
    this.state = {
      numberSubmissions: 0
    }
  }

  componentWillMount(){
    if(this.props.isTeacher === true){
      api.get(`/submissions/assignments/${this.props.id}/count`)
        .then((response)=>{
          this.setState({numberSubmissions: response.data.data.count});
        })
        .catch((error)=>{
          console.log(`AssignmentTableCard.js: ${error}`);
        })
    }
  }

  render() {
    return (
      <tr>
        <td><Link style={{textDecoration: 'none'}} to={{pathname: `/courses/${this.props.section_id}/assignments/${this.props.id}`, state: {group_id: this.props.group_id}}}>{this.props.name}</Link></td>  
        <td>{this.props.content}</td>
        <td>{this.props.due_at}</td>
        {this.props.isTeacher === true ? <td>{this.state.numberSubmissions}</td> : ""}
        <td><span className="icon has-text-link">{this.props.group_id === null ? <i className="fa fa-user"></i> : <i className="fa fa-users"></i>}</span></td>
      </tr>
    );
  }
}

AssignmentTableCard.propTypes = {
  section_id: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  due_at: PropTypes.string.isRequired,
  group_id: PropTypes.string,
  isTeacher: PropTypes.bool.isRequired
}


export default AssignmentTableCard;
