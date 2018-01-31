import React from "react";
import { Link } from "react-router-dom";
import ConfirmCard from "./ConfirmCard";
//import api from "../api/Api";

class TopAnnouncement extends React.Component {
  constructor() {
    super();
    this.state = {
      data: false
    };
  }

  handleClick() {
    this.props.handleViewReplies();
    this.setState({
      data: !this.state.data
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <strong>{this.props.author_name}</strong>
          <br />
          <small>{this.props.inserted_at}</small>
          <br />
          {this.props.content}
        </div>
        {this.props.hasPosts === true ? (
          <footer className="card-footer">
            <p className="card-footer-item">
              <span>
                <button
                  className="button"
                  onClick={this.handleClick.bind(this)}
                >
                  <span className="icon">
                    <i className={this.state.data ? "fa fa-plus" : "fa fa-minus"} />
                  </span>
                  <span>
                    {!this.state.data ? "Collapse Replies" : "View Replies"}
                  </span>
                </button>
              </span>
            </p>
          </footer>
        ) : null}
      </div>
    );
  }
}

export default TopAnnouncement;
