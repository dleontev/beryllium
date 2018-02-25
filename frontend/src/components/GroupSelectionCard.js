import React from "react";
import api from "../api/Api";
import PropTypes from "prop-types";

class GroupSelectionCard extends React.Component{
	constructor(){
		super();
		this.state = {
			data: [],
			loading: true
		}
	}

	componentWillMount(){
		api.get(`/groups/sections/${this.props.section_id}`)
			.then((response) => {
				this.setState({
					data: response.data.data,
					loading: false
				});
				this.props.handleStoreGroups(response.data.data);
			})
			.catch((error) =>{
				console.log(error);
			});
	}


	displayGroups(){
		return this.state.data.map((group) => (
			<option key={group.id} id={group.id}>
				{group.name}
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
					<label className="label">Groups</label>
					<div className={`select is-multiple ${this.props.selected === false ? "" : "is-danger"}`}>
						<select multiple size="4" id="GroupSelectionCard" onChange={this.handleChange.bind(this)} defaultValue={[]}>
							{this.displayGroups()}
						</select>
					</div>
				</div>
				}
			</div>
		);
	}
}

GroupSelectionCard.propTypes = {
	section_id: PropTypes.string.isRequired,
	handleStoreGroups: PropTypes.func.isRequired,
	handleSelect: PropTypes.func.isRequired,
	selected: PropTypes.bool.isRequired
}

export default GroupSelectionCard;