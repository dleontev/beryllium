import React from "react";
//import api from "../api/Api";
import PropTypes from "prop-types";

class QuizCard extends React.Component{
  constructor(){
    super();
    this.state = {
      answers: [],
      isLoading: true
    }
  }

  componentWillMount(){
    var answers = [];
    if(this.props.a1 !== ""){
      answers.push(
        {
          answer_field: "a1",
          answer_content: this.props.a1
        }
      );
    }
    if(this.props.a2 !== ""){
      answers.push(
        {
          answer_field: "a2",
          answer_content: this.props.a2
        }
      );
    }
    if(this.props.a3 !== ""){
      answers.push(
        {
          answer_field: "a3",
          answer_content: this.props.a3
        }
      );
    }
    if(this.props.a4 !== ""){
      answers.push(
        {
          answer_field: "a4",
          answer_content: this.props.a4
        }
      );
    }
    if(this.props.a5 !== ""){
      answers.push(
        {
          answer_field: "a5",
          answer_content: this.props.a5
        }
      );
    }

    this.setState({
      answers: answers
    });
    /*
    
    */
  }

  getAnswers(){
    return this.state.answers.map((value) =>(
      <div key={`${this.props.question_id}${value.answer_field}`}>
        <div className="radio">
          <label className="radio">
            <input type="radio" name={`${this.props.question_id}`} id={value.answer_field}/>
            {value.answer_content}
          </label>
        </div>
        <br/>
      </div>
    ));
  }

  render(){
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {this.props.question}
          </p>
        </header>
        <div className="card-content">
          <div className="field">
            <div className="control">
              {this.getAnswers()}
            </div>
          </div>
        </div>
        <footer className="card-footer">
        </footer>
      </div>
    );
  }
}

QuizCard.propTypes = {
  question: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
  a1: PropTypes.string.isRequired,
  a2: PropTypes.string.isRequired,
  a3: PropTypes.string.isRequired,
  a4: PropTypes.string.isRequired,
  a5: PropTypes.string.isRequired,
  question_id: PropTypes.string.isRequired
}

export default QuizCard;