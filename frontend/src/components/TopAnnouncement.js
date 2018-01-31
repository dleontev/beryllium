import React from "react";
import { Link } from "react-router-dom";
import ConfirmCard from "./ConfirmCard";
import api from "../api/Api";


class TopAnnouncement extends React.Component{

	constructor(){
		super();
		this.state = {
			data: false
		}
	}

	handleClick(){
		this.setState({
			data: !this.state.data
		 });
		}
    render(){
        return (
            <div className="card">
            	<div className="card-content">
    						<p className="title is-5">
      						{this.props.content}
    						</p>
   				 			<p className="subtitle">
									<br/>
									{this.props.inserted_at}
									<br/>
									{this.props.author_name}
    						</p>
 	 						</div>
  						<footer className="card-footer">
    						<p className="card-footer-item">
      						<span>
        						<div className="button" onClick={this.handleClick.bind(this)}> View Replies {this.state.data === true ? <span className="loading"/> : ""} </div>
      						</span>
    						</p>
  						</footer>
					</div>
        );

    }
}


export default TopAnnouncement;