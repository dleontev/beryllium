import React from "react";
import api from "../api/Api";
//import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";

class SubmissionCard extends React.Component {
  constructor(){
    super();
    this.state = {
      
    }
  }

  componentWillMount(){
    //api.get(``)
  }

  render(){
    return (
      <div>
      </div>
    );
  }
}

SubmissionCard.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
};


export default SubmissionCard;