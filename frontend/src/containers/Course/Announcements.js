import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import AnnouncementCard from "../../components/AnnouncementCard";

class Announcements extends React.Component {
  constructor() {
    super();
    this.state = { announcements: [] };
  }

  componentWillMount() {
    api
      .get("/announcements/sections/" + this.props.match.params.id)
      .then(response => {
        this.setState({ announcements: response.data.data });
      });
  }

  render() {
    var announcements = this.state.announcements.map((announcement, index) => (
      <AnnouncementCard
        key={index}
        id={announcement.id}
        title={announcement.title}
        author={announcement.first_name + " " + announcement.last_name}
        inserted_at={new Date(announcement.inserted_at).toLocaleDateString()}
        updated_at={new Date(announcement.updated_at).toLocaleDateString()}
        content={announcement.content}
      />
    ));

    if (announcements.length === 0) {
      announcements = "No announcements found.";
    }

    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Announcements</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="announcements/new">
                <button className="button is-link">+Announcement</button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="section">{announcements}</div>
      </div>
    );
  }
}

export default Announcements;
