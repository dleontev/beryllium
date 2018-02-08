import React from "react";
//import profile_image from "../images/blank-profile.png";
//import api from "../api/Api";
//import ReplyCard from "./ReplyCard";
//import ConfirmCard from "./ConfirmCard";
//import {Socket} from "phoenix";


class EditCommentCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
					data: this.props.content
        }
    }

		handleText(event){
			this.setState({
				data: event.target.value
			});
		}

		handleSubmit(event){
			this.props.handleEdited(this.state.data);
		}

    render(){
			return(
					<div>
						<div className="field">
							<p className="control">
								<textarea autoFocus className="textarea" onChange={this.handleText.bind(this)} value={this.state.data}></textarea>
							</p>
						</div>
						<div className="level-left">  {/* */}
							<div className="field is-grouped">

								<p className="control">
									<a className="button is-info is-small" onClick={this.props.handleCancelEdit}>Cancel</a>
								</p>

								<p className="control">
									<a className="button is-success is-small" onClick={this.handleSubmit.bind(this)} >Save</a>
								</p>

							</div>
							<br />
						</div> {/* */}
					</div>
			);
    }
}


export default EditCommentCard;