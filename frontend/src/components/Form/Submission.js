import React from "react";
import api from "../../api/Api";
import PropTypes from "prop-types";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuizCard from "../QuizCard";

class Submission extends React.Component {
	constructor(props){
			super(props);
			this.handleUpdateAnswers = this.handleUpdateAnswers.bind(this);
			this.state = {
				data: {
					assignment_id: this.props.assignment_id,
					file_id: "",
					text_entry: "",
					quiz_answers: [],
					quiz_id: null,
					type: this.props.type
				},
				text: "",
				quiz_data: null,
				answer_submissions: {}
			}
	}

	componentWillMount(){
		if(this.props.type === 2){
			api.get(`/quizzes/assignments/${this.props.assignment_id}`)
				.then((response) => {
					this.setState({
						quiz_data: response.data.data
					});
					console.log(response.data.data);
				})
				.catch((error) => {
					console.log(`Submission.js: ${error}`);
				});
		}
	}

	handleChange(value){
		var data = Object.assign({}, this.state.data);
		data.text_entry = value;
		this.setState({
			data
		});
	}

	submitAssignment(){
		api.post("/submissions", {submission: this.state.data})
			.then((response) => {
				console.log(response.data.data);
			})
			.catch((error) =>{
				console.log(`Submission.js: ${error}`);
			})
	}

	handleSubmit(){
		if(this.state.quiz_data !== null){
			var data = Object.assign({}, this.state.data);
			for(let i = 0; i < this.state.quiz_data.questions.length; ++i){
				if(this.state.answer_submissions[this.state.quiz_data.questions[i].question_id] !== undefined){
					data.quiz_answers.push(this.state.answer_submissions[this.state.quiz_data.questions[i].question_id]);
				}
			}
			data.quiz_id = this.state.quiz_data.quiz.quiz_id;
			this.setState({data}, () => {this.submitAssignment()});
		}else{
			this.submitAssignment();
		}
	}

	getQuestions(){
		if(this.state.quiz_data !== null){
			return this.state.quiz_data.questions.map((value) => 
			(
				<div key={value.question_id}>
					<QuizCard
						question_id = {value.question_id}
						{...value}
						handleUpdateAnswers = {this.handleUpdateAnswers}
					/>
					<br/>
				</div>
			));
		}
	}

	handleUpdateAnswers(answer_object){
		var answer_submissions = Object.assign({}, this.state.answer_submissions);
		answer_submissions[`${answer_object.question_id}`] = answer_object;
		this.setState({answer_submissions}, () => {console.log(this.state.answer_submissions)});
	}

	getButton(){
		return (
			<button className="button is-info" onClick={this.handleSubmit.bind(this)}>
				<span> Submit </span>
			</button>
		);
	}

	render(){
		if(this.props.type === 0){
			return (
				<div>
					{//<textarea className="textarea" placeholder="Enter submission"></textarea>
					}
					<ReactQuill 
						value={this.state.data.text_entry}
						onChange={this.handleChange.bind(this)} 
					/>
					<br/>
					{this.getButton()}
				</div>
			);
		}
		else {
			if(this.state.quiz_data === null){
				return (
					<div className="loading">
					</div>
				);
			} 
			else{
				return (
					<div>
						{this.getQuestions()}
						{this.props.isTeacher === false ? this.getButton() : ""}
					</div>
				);
			}
		}
	}
}

Submission.propTypes = {
	assignment_id: PropTypes.string.isRequired,
	type: PropTypes.number.isRequired,
	isTeacher: PropTypes.bool.isRequired
}

export default Submission;