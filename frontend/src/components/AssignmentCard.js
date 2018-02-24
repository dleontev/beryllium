import React from "react";
import api from "../api/Api";
import moment from "moment";
import Submission from "./Form/Submission";

class AssignmentCard extends React.Component {
	constructor(){
		super();
		this.state = {
				data: {},
				isPressed: false
		}
	}


	getType(){
		if(this.state.data !== undefined){
			console.log(this.state.data.type)
			switch(this.state.data.type){
				case 0:
					return (
						<span>
							<span className="icon">
								<i class="fa fa-align-left"></i>
							</span>
							<span>Submit Text</span>
						</span>
					);
				case 1:
					return (
						<span>
							<span className="icon">
								<i class="fa fa-upload"></i>
							</span>
							<span>Submit File</span>
						</span>
					);
				case 2:
					return (
						<span>
							<span className="icon">
								<i class="fa fa-question-circle"></i>
							</span>
							<span>Take Quiz</span>
						</span>
					);
			}
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
	
	handleClick(event){
		this.setState({isPressed: !this.state.isPressed});
	}
	render(){
		return (
			<div>
				<div className="card">
					<header className="card-header">
						<p className="card-header-title is-size-5">
							{this.state.data.title}
						</p>
					</header>
					<div className="card-content is-size-6">
						{this.state.data.content}
					</div>
					<div className="assignment_footer is-size-7">
						Due,
						{new moment(this.state.data.due_at).format("llll")}
					</div>
					<div className="card-footer">
						<div className="card-footer-item">
							<button className="button" onClick={this.handleClick.bind(this)}>
								{this.getType()}
							</button>
						</div>
					</div>
				</div>
				<br/>
				{this.state.isPressed === true ? <Submission section_id={this.props.id} assignment_id={this.props.assignment_id}/> : ""} 
			</div>
		);
	}
}
export default AssignmentCard;