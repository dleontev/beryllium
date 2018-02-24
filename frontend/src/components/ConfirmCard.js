import React from "react";
import PropTypes from "prop-types";

class ConfirmCard extends React.Component {
  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box">
            <div className="title is-5 has-text-centered">Are you sure?</div>
            <div className="level">
              <div className="level-item">
                <button
                  className="button"
                  onClick={() => this.props.onCancel()}
                >
                  Cancel
                </button>
              </div>
              <div className="level-item">
                <button
                  className="button is-danger"
                  onClick={() => this.props.onClick()}
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

ConfirmCard.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ConfirmCard;
