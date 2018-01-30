import React from "react";
import { Link } from "react-router-dom";
import ConfirmCard from "./ConfirmCard";
import api from "../api/Api";

class AnnouncementCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: "modal",
    };

    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    this.setState({
      modalState:
        this.state.modalState === "modal" ? "modal is-active" : "modal"
    });
  }

  handleDelete() {
    api
      .delete(`/discussions/${this.props.id}`)
      .then(() => {
        this.handleModal();
        this.props.refresh();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleLock() {
    api
      .put(`/discussions/${this.props.id}`, {
        discussion: {
          is_locked: !this.props.is_locked
        }
      })
      .then(() => {
        this.props.refresh();
      });
  }

  render() {
    return (
      <div>
        <ConfirmCard
          modalToggle={this.state.modalState}
          onClick={() => this.handleDelete()}
          onCancel={() => this.handleModal()}
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
                <p className="control is-small">
                  {this.props.is_locked ? "Locked" : "Unlocked"}{" "}
                </p>
                <p className="control">
                  <a
                    className="button is-danger"
                    onClick={() => this.handleModal()}
                  >
                    <span className="icon">
                      <i className="fa fa-trash-o fa-lg" />
                    </span>
                  </a>
                </p>
                <p className="control">
                  <a className="button" onClick={() => this.handleLock()}>
                    <span className="icon">
                      {this.props.is_locked ? (
                        <i className="fa fa-unlock fa-lg" />
                      ) : (
                        <i className="fa fa-lock fa-lg" />
                      )}
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
