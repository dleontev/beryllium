import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import DiscussionTableCard from "../../components/DiscussionTableCard";
import 'bulma-tooltip';

class Discussions extends React.Component {
  constructor() {
    super();
    this.state = { discussions: null };
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
    if (!this.state.discussions) return <div className="loading" />;

    if (this.state.discussions.length === 0)
      return "There are no discussions to show in this section.";

    return (
      <div className="column is-fullhd">
        <div className="content">{this.getDiscussions()} </div>
      </div>
    );
  }

  getDiscussions() {
    return this.state.discussions.map((discussion, index) => (
      <DiscussionTableCard
        key={index}
        id={discussion.id}
        title={
          <Link to={`discussions/${discussion.id}`}>{discussion.title}</Link>
        }
        author={
          <Link
            to={`/courses/${this.props.match.params.id}/users/${
              discussion.author_id
            }`}
          >
            @{discussion.author_name}
          </Link>
        }
        inserted_at={new Date(discussion.inserted_at).toLocaleDateString()}
        updated_at={new Date(discussion.updated_at).toLocaleDateString()}
        is_locked={discussion.is_locked}
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
                <button className="button is-link" data-tooltip="Tooltip Text">
                  <span className="icon">
                    <i className="fa fa-plus-circle" />
                  </span>
                  <span>Discussion</span>
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {this.getDiscussionTable()}
      </div>
    );
  }
}

export default Discussions;
