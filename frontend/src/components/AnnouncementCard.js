import React from "react";
import { Link } from "react-router-dom";
import ConfirmCard from "./ConfirmCard";
import api from "../api/Api";

class AnnouncementCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false
    };
  }

  handleDelete() {
    api
      .delete(`/discussions/${this.props.id}`)
      .then(() => {
        this.setState({ modalState: false });
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

  getDelete() {
    return (
      <a onClick={() => this.handleLock()}>
        {this.props.is_locked ? "Unlock" : "Lock"}
      </a>
    );
  }

  getLock() {
    return <a onClick={() => this.setState({ modalState: true })}>Delete</a>;
  }

  render() {
    return (
      <div>
        {this.state.modalState && (
          <ConfirmCard
            onClick={() => this.handleDelete()}
            onCancel={() => this.setState({ modalState: false })}
          />
        )}

        <div className="panel" style={{ marginBottom: "15px" }}>
          <div className="panel-heading">
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <Link
                    to={`announcements/${this.props.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="level-left">{this.props.title}</div>
                  </Link>
                </div>
              </div>

              <div className="level-right">
                <div className="level-item">
                  <div className="control is-small">
                    <div className="tooltip">
                      {this.props.is_locked && <i className="fa fa-lock" />}
                      <span className="tooltiptext">
                        This topic is closed for comments.
                      </span>
                    </div>
                  </div>
                </div>
                <p className="level-item">
                  {this.props.showControls && this.getDelete()}
                </p>
                <p className="level-item">
                  {this.props.showControls && this.getLock()}
                </p>
              </div>
            </nav>
          </div>

          <div className="panel-block">
            <table
              className="table is-fullwidth"
              style={{ margin: 0, padding: 0 }}
            >
              <tbody>
                <tr>
                  <td>
                    <b>{this.props.author}</b>&nbsp;
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {this.props.inserted_at}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <div className="announcement fade">
                      <p>{this.props.content}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AnnouncementCard;
