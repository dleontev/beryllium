import React from "react";
import api from "../../api/Api";
import PropTypes from "prop-types";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
				text: ""
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
	}
}

Submission.propTypes = {
	assignment_id: PropTypes.string.isRequired,
	type: PropTypes.number.isRequired
}

export default Submission;