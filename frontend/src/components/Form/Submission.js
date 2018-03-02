import React from "react";
import api from "../../api/Api";
import PropTypes from "prop-types";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuizCard from "../QuizCard";

class Submission extends React.Component {
	constructor(props){
			super(props);
			this.state = {
				data: {
					assignment_id: this.props.assignment_id,
					file_id: "",
					text_entry: "",
					quiz_answers: [],
					type: this.props.type
				},
				text: "",
				quiz_data: null
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
		this.submitAssignment();
	}

	getQuestions(){
		if(this.state.quiz_data !== null){
			return this.state.quiz_data.questions.map((value) => 
			(
				<div key={value.question_id}>
					<QuizCard
						question_id = {value.question_id}
						{...value}
					/>
					<br/>
				</div>
			));
		}
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
						<button className="button is-info" onClick={this.handleSubmit.bind(this)}>
							<span> Submit </span>
						</button>
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
					</div>
				);
			}
		}
	}
}

Submission.propTypes = {
	assignment_id: PropTypes.string.isRequired,
	type: PropTypes.number.isRequired
}

export default Submission;