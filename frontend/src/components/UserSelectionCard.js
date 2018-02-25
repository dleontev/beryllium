import React from "react";
import api from "../api/Api";
import PropTypes from "prop-types";

class UserSelectionCard extends React.Component{
	constructor(){
		super();
		this.state = {
			data: [],
			loading: true
		}
	}

	componentWillMount(){
		api.get(`/users/sections/${this.props.section_id}`)
			.then((response) => {
				this.setState({
					data: response.data.data,
					loading: false
				});
			})
			.catch((error) =>{
				console.log(error);
			});
	}


	displayUsers(){
		return this.state.data.map((user) => (
			<option key={user.user_id} id={user.user_id}>
				{user.name}
			</option>
		));
	}

	handleChange(event){
		var options = event.target.options;
		var value = [];
		for(let i = 0, l = options.length; i < l; ++i){
			if(options[i].selected){
				value.push(options[i].id)
			}
		}
		this.props.handleSelect(value);
	}

	render(){
		return (
			<div>
				{this.state.loading === true ?
				<div className="loading">
				</div>
				:
				<div className="control">
					<label className="label">Students</label>
					<div className={`select is-multiple ${this.props.selected === false ? "" : "is-danger"}`}>
						<select disabled = {this.props.is_groups ? true : false} multiple id="UserSelectionCard" size="4" onChange={this.handleChange.bind(this)} defaultValue={[]}>
							{this.displayUsers()}
						</select>
					</div>
				</div>
				}
			</div>
		);
	}
}

UserSelectionCard.propTypes = {
	selected: PropTypes.bool.isRequired,
	is_groups: PropTypes.bool.isRequired,
	handleSelect: PropTypes.func.isRequired,
	section_id: PropTypes.string.isRequired
}

export default UserSelectionCard;