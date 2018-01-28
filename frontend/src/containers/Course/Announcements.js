import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import AnnouncementCard from "../../components/AnnouncementCard";

class Announcements extends React.Component {
  constructor() {
    super();
    this.refreshAnnouncements = this.refreshAnnouncements.bind(this);
    this.state = { announcements: [] };
  }

  refreshAnnouncements(){
    this.apiCall();
  }

  componentWillMount() {
    this.apiCall();
  }


  apiCall(){
    api
      .get(`/discussions/sections/${this.props.match.params.id}/false`)
      .then(response => {
        if (typeof response !== "undefined") {
          this.setState({ announcements: response.data.data });
        }
      });
  }

  getAnnouncements() {
    if (this.state.announcements.length === 0) {
      return "There are no assignments to show.";
    }

    return this.state.announcements.map((announcement, index) => (
      <AnnouncementCard
        refresh = {this.refreshAnnouncements}
        section_id = {this.props.match.params.id}
        key={index}
        title={announcement.title}
        id={announcement.id}
        author={announcement.author_name}
        inserted_at={new Date(announcement.inserted_at).toLocaleDateString()}
        updated_at={new Date(announcement.updated_at).toLocaleDateString()}
        content={
          announcement.content.length > 100
            ? announcement.content.substring(0, 100) + "[...]"
            : announcement.content
        }
      />
    ));
  }

  render() {
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
                <button className="button is-link">
                  <span className="icon">
                    <i className="fa fa-plus-circle" />
                  </span>
                  <span>Announcement</span>
                </button>
              </Link>
            </div>
          </div>
        </nav>

        <div>{this.getAnnouncements()}</div>
      </div>
    );
  }
}

export default Announcements;
