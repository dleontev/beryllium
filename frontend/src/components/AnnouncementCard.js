import React from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteCard from "./ConfirmDeleteCard";

class AnnouncementCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: "modal"
    };

    this.handleModal = this.handleModal.bind(this);
  }

  handleModal(e) {
    this.setState({
      modalState:
        this.state.modalState === "modal" ? "modal is-active" : "modal"
    });
  }

  render() {
    return (
      <div>
        <ConfirmDeleteCard
          modalToggle={this.state.modalState}
          handle={this.handleModal}
          id={this.id}
        />
        <article className="message is-link">
          <div className="message-header">
            <div className="levels">
              <Link
                to={`announcements/${this.props.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="level-left">{this.props.title}</div>
              </Link>
            </div>
            <div className="level-left">
              <div className="field is-grouped">
                <p className="control">
                  <a className="button" onClick={this.handleModal}>
                    <span className="icon">
                      <i className="fa fa-trash-o fa-lg" />
                    </span>
                  </a>
                </p>
                <p className="control">
                  <a className="button">
                    <span className="icon">
                      <i className="fa fa-lock fa-lg" />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="message-body">
            <p>
              <strong>{this.props.author}</strong>{" "}
              <small>{this.props.inserted_at}</small>
            </p>
            <div>{this.props.content}</div>
          </div>
        </article>
      </div>
    );
  }
}

export default AnnouncementCard;
