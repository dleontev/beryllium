import React from "react";
import { Redirect } from "react-router-dom";

class ConfirmDeleteCard extends React.Component {
    constructor(props){
				super(props);
				this.state = {
					deleted: false
				}
		}
		
		handleClick(event){
			/*
				MAKE API CALL HERE TO DELETE ANNOUNCEMENT
				PARENT COMPONENT "<AnnouncementCard/>" PASSED
				ITS ANNOUNCEMENT ID, WHICH CAN BE ACCESSED USING
				"this.props.id"
			*/

			this.setState({deleted: true});
		}
    render(){
			/*
				if(this.state.deleted === true){
					return (
						<Redirect to={`/courses/${this.props.match.params.id}/announcements`} />
					);
				}
			*/
        return (
					<div className={this.props.modalToggle}>
						<div className="modal-background"></div>
						<div className="modal-content">
							<div className="box">
								<div className="title is-5 has-text-centered"> Are you sure? </div>
								<div className="level">
									<div className="level-item">
										<button className="button is-success" onClick={this.props.handle}> Cancel </button>
                	</div>
									<div className="level-item">
										<button className="button is-danger" onClick={this.handleClick.bind(this)}> Confirm </button>
                	</div>
								</div>
            	</div>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
          </div>
        );
    }

}
export default ConfirmDeleteCard;