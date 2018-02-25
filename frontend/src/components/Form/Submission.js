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
					text_entry: "",
				},
				text: ""
			}
	}

	handleChange(value){
		this.setState({
			text: value
		});
		console.log(value);
	}

	submitAssignment(){
		api.post("/submissions", this.state.data)
			.then((response) => {
				console.log(response.data.data);
			})
			.catch((error) =>{
				console.log(`Submission.js: ${error}`);
			})
	}

	render(){
		return (
			<div>
				{//<textarea className="textarea" placeholder="Enter submission"></textarea>
				}
				<ReactQuill value={this.state.text}
                  onChange={this.handleChange.bind(this)} />
					<br/>
					<button className="button is-info">
						<span> Submit </span>
					</button>
			</div>
		);
	}
}

Submission.propTypes = {
	assignment_id: PropTypes.string.isRequired
}

export default Submission;