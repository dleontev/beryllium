import React from "react";
import api from "../api/Api";

class GroupsetSelectionCard extends React.Component{
	constructor(){
		super();
		this.state = {
			data: [],
			loading: true,
			selected: []
		}
	}

	componentWillMount(){
		api.get(`/groupsets/sections/${this.props.section_id}`)
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


	displayGroupSets(){
		return this.state.data.map((groupset, index) => (
			<option key={groupset.id} id={groupset.id}>
				{groupset.name}
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
					<label className="label">Groupsets</label>
					<div className="select is-multiple">
						<select multiple size="4" id="GroupsetSelectionCard" onChange={this.handleChange.bind(this)} defaultValue={[]}>
							{this.displayGroupSets()}
						</select>
					</div>
				</div>
				}
			</div>
		);
	}
}


export default GroupsetSelectionCard;