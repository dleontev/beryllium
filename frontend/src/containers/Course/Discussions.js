import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import AnnouncementCard from "../../components/AnnouncementCard";

class Discussions extends React.Component {
  constructor() {
    super();
    this.state = { discussions: [] };
  }

  componentWillMount() {
    api
      .get(`/discussions/sections/${this.props.match.params.id}/true`)
      .then(response => {
        if (typeof response !== "undefined") {
          this.setState({ discussions: response.data.data });
        }
      });
  }

  getDiscussions() {
    if (this.state.discussions.length === 0) {
      return "No discussions found.";
    }

    return this.state.discussions.map((discussion, index) => (
      <AnnouncementCard
        key={index}
        id={discussion.id}
        title={discussion.title}
        author={discussion.first_name + " " + discussion.last_name}
        inserted_at={new Date(discussion.inserted_at).toLocaleDateString()}
        updated_at={new Date(discussion.updated_at).toLocaleDateString()}
        content={discussion.content}
      />
    ));
  }

  render() {
    return (
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="is-size-4">Discussions</h1>
          </div>
          <div className="navbar-menu" />

          <div className="navbar-end">
            <div className="control">
              <Link to="discussions/new">
                <button className="button is-link">+Discussion</button>
              </Link>
            </div>
          </div>
        </nav>

        <div>
          <br />
          {this.getDiscussions()}
        </div>
      </div>
    );
  }
}

export default Discussions;
