import React from "react";
import api from "../api/Api";
import moment from "moment";
import Submission from "./Form/Submission";
import Submissions from "../containers/Submissions"
import PropTypes from "prop-types";

class AssignmentCard extends React.Component {
	constructor(){
		super();
		this.state = {
				data: {},
				isPressed: false,
				isLoading: true,
				isTeacher: null,
				group_id: null,
				tab: true
		}
	}


	getType(){
		if(this.state.data !== undefined){
			switch(this.state.data.type){
				case 0:
					return (
						<button className="button" onClick={this.handleClick.bind(this)}>
							<span>
								<span className="icon">
									<i className="fa fa-align-left"></i>
								</span>
								<span>Submit Text</span>
							</span>
						</button>
					);
				case 1:
					return (
						<div className="file">
							<label className="file-label">
								<input className="file-input" type="file"/>
								<span className="file-cta">
									<span className="file-icon">
										<i className="fa fa-upload"></i>
									</span>
									<span className="file-label">
										Submit File
									</span>
								</span>
							</label>
						</div>
					);
				case 2:
					return (
						<button className="button" onClick={this.handleClick.bind(this)}>
							<span>
								<span className="icon">
									<i className="fa fa-question-circle"></i>
								</span>
								<span>Take Quiz</span>
							</span>
						</button>
					);
				default:
					return (
						<span>
							<span>INVALID TYPE</span>
						</span>
					);
			}
		}
	}
	componentWillMount(){
		api.get(`/assignments/${this.props.match.params.assignment_id}`)
			.then((response)=>{
				this.setState({
					data: response.data.data,
					isLoading: false
				});
				console.log(response.data.data);
			})
			.catch((error)=>{
				console.log(`AssignmentCard.js: ${error}`);
			})
		api.isTeacher(this.props.match.params.id)
			.then((result) =>{
				this.setState({isTeacher: result});
			});
		if(this.props.location.state.group_id !== undefined){
			this.setState({group_id: this.props.location.state.group_id});
		}

	}
	
	handleClick(){
		this.setState({isPressed: !this.state.isPressed});
	}

	getButton(){
		if(this.state.isTeacher === true && this.state.data.type !== 2){
			return "";
		}else if(this.state.isTeacher === true && this.state.data.type === 2){
			return (
				<div className="card-footer">
					<div className="card-footer-item">
						<button className="button" onClick={this.handleClick.bind(this)}>
							<span>
								<span className="icon">
									<i className="fa fa-question-circle"></i>
								</span>
								<span>View Questions</span>
							</span>
						</button>
					</div>
				</div>
			);
		}else{
			return (
				<div className="card-footer">
					<div className="card-footer-item">
						{this.getType()}
					</div>
				</div>
			);
		}
	}
	
	handleTabAssignment(){
		this.setState({tab: true});
	}
	handleTabSubmission(){
		this.setState({tab: false});
	}

	render(){
		if(this.state.isLoading === true){
			return (
				<div className="loading">
				</div>
			);
		}
		return (
			<div>
				<div className="tabs">
					<ul>
						<li className={this.state.tab === true ? "is-active" : ""} onClick={this.handleTabAssignment.bind(this)}><a>Assignment</a></li>
						<li className={this.state.tab === true ? "" : "is-active"} onClick={this.handleTabSubmission.bind(this)}><a>Submissions</a></li>
					</ul>
				</div>
				{this.state.tab === true ?
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
						{this.state.isTeacher !== null ? this.getButton() : <div className="loading"> </div>}
					</div>
					<br/>
					{this.state.isPressed === true ? 
						<Submission 
							section_id={this.props.match.params.id} 
							assignment_id={this.props.match.params.assignment_id} 
							type={this.state.data.type}
							isTeacher={this.state.isTeacher}
							group_id={this.state.group_id}/> : 
					""}
				</div>
				: <Submissions
						section_id={this.props.match.params.id} 
						assignment_id={this.props.match.params.assignment_id} 
						type={this.state.data.type}
						isTeacher={this.state.isTeacher}
						group_id={this.state.group_id}
						due_at={this.state.data.due_at}
					/>}
			</div>
		);
	}
}

AssignmentCard.propTypes = {
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired
}
export default AssignmentCard;