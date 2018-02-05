import React from "react";
import profile_image from "../images/blank-profile.png";
import api from "../api/Api";


class ReplyCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
							discussion_id: this.props.discussion_id,
							parent_id: this.props.parent_id,
							content: "",
							submitted: false
						}
        }
    }


		handleSubmit(event){
			if(!this.state.submitted){
			this.setState({submitted: true});
			api
				.post(`/posts/`, this.state.data)
				.then(response => {
					console.log("posted");
					this.props.handleSubmit();
				}).catch(error => {
					console.log(error);
				});
				this.props.closeReplyBox();
			}
		}


		handleText(event){
			var data = Object.assign({}, this.state.data);
    	data.content = event.target.value;
    	this.setState({ data });
		}

    render(){
        return (
					<article className="media">
						<figure className="media-left">
							<p className="image is-64x64">
								<img src={profile_image}/>
							</p>
						</figure>
						<div className="media-content">
							<div className="field">
								<p className="control">
									<textarea className="textarea" placeholder="Add a comment..." onChange={this.handleText.bind(this)}></textarea>
								</p>
							</div>
							<nav className="level">
								<div className="level-left">
									<div className="level-item">
										<a className="button is-info" onClick={this.handleSubmit.bind(this)}> Submit </a>
									</div>
								</div>
							</nav>
						</div>
					</article>
        );
    }
}

export default ReplyCard;
