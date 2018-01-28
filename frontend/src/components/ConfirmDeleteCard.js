import React from "react";
//import { Redirect } from "react-router-dom";
import api from "../api/Api";

class ConfirmDeleteCard extends React.Component {
  handleClick(event) {
    console.log(this.props.id);
    /*
				MAKE API CALL HERE TO DELETE ANNOUNCEMENT
				PARENT COMPONENT "<AnnouncementCard/>" PASSED
				ITS ANNOUNCEMENT ID, WHICH CAN BE ACCESSED USING
				"this.props.id"
			*/
    api.delete(`/discussions/${this.props.id}`).then(response =>{
      this.props.handle();
      this.props.refresh();
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className={this.props.modalToggle}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box">
            <div className="title is-5 has-text-centered">Are you sure?</div>
            <div className="level">
              <div className="level-item">
                <button
                  className="button is-success"
                  onClick={this.props.handle}
                >
                  Cancel
                </button>
              </div>
              <div className="level-item">
                <button
                  className="button is-danger"
                  onClick={this.handleClick.bind(this)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConfirmDeleteCard;
