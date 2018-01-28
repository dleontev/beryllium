import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import DiscussionTableCard from "../../components/DiscussionTableCard";
//import AnnouncementCard from "../../components/AnnouncementCard";

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

  getDiscussionTable() {
    if (this.state.discussions.length === 0) {
      return "There are no dicsussions to show.";
    }

    return (
      <table className="table is-fullwidth is-striped is-hoverable is-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>{this.getDiscussions()}</tbody>
      </table>
    );
  }

  getDiscussions() {
    return this.state.discussions.map((discussion, index) => (
      <DiscussionTableCard
        key={index}
        id={discussion.id}
        title={discussion.title}
        author={discussion.author_name}
        inserted_at={new Date(discussion.inserted_at).toLocaleDateString()}
        updated_at={new Date(discussion.updated_at).toLocaleDateString()}
        content={discussion.content}
        is_discussion={true}
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
                <button className="button is-link">
                  <span className="icon">
                    <i className="fa fa-plus-circle" />
                  </span>
                  <span>Discussion</span>
                </button>
              </Link>
            </div>
          </div>
        </nav>

        <div>{this.getDiscussionTable()}</div>
      </div>
    );
  }
}

export default Discussions;
