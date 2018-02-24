import React from "react";
import api from "../../api/Api";

class Submission extends React.Component {
	constructor(props){
			super(props);
			this.state = {
				data: {
					assignment_id: this.props.assignment_id,
					text_entry: "",

				}
			}
	}

	componentWillMount(){
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
				<textarea className="textarea" placeholder="Enter submission"></textarea>
					<br/>
					<button className="button is-info">
						<span> Submit </span>
					</button>
			</div>
		);
	}
}

export default Submission;