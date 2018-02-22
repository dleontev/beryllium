import React from "react";
import api from "../api/Api";
import moment from "moment";

class AssignmentCard extends React.Component {
	constructor(){
		super();
		this.state = {
				data: {}
		}
	}

	componentWillMount(){
		api.get(`/assignments/${this.props.match.params.assignment_id}`)
			.then((response)=>{
				this.setState({
					data: response.data.data
				});
				console.log(response.data.data);
			})
			.catch((error)=>{
				console.log(`AssignmentCard.js: ${error}`);
			})
	}

	render(){
		return (
			<div className="card">
				<header className="card-header">
					<p className="card-header-title is-size-5">
						{this.state.data.title}
					</p>
				</header>
				<div className="card-content is-size-6">
					{this.state.data.content}
				</div>
				<div className="card-footer">
					<div className="assignment_footer is-size-7">
						Due,
						<br/>{new moment(this.state.data.due_at).format("llll")}
					</div>
				</div>
			</div>
		);
	}
}
export default AssignmentCard;