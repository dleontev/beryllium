import React from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import DiscussionTableCard from "../../components/DiscussionTableCard";
//import 'bulma-tooltip';

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

  getDiscussions(discussions) {
    return discussions.map((discussion, index) => (
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

  getDiscussionSection(name, discussions) {
    var discussionData =
      discussions.length > 0
        ? this.getDiscussions(discussions)
        : <center>There are no discussions in this section.</center>;

    return (
      <div className="panel">
        <div className="panel-heading">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">{name}</div>
            </div>

            <div className="level-right">
              <p />
            </div>
          </nav>
        </div>

        <div className="panel-block" style={{ display: "block" }}>
          {discussionData}
        </div>
      </div>
    );
  }

  getPinnedDiscussions() {
    var discussions = this.state.discussions.filter(
      d => d.is_pinned && !d.is_locked
    );

    if (discussions.length > 0) {
      return this.getDiscussionSection("Pinned Discussions", discussions);
    }
  }

  getStandardDiscussions() {
    return this.getDiscussionSection(
      "Discussions",
      this.state.discussions.filter(d => !d.is_pinned && !d.is_locked)
    );
  }

  getLockedDiscussions() {
    return this.getDiscussionSection(
      "Closed for Comments",
      this.state.discussions.filter(d => d.is_locked)
    );
  }

  getDiscussionData() {
    if (!this.state.discussions) return <div className="loading" />;

    return (
      <div>
        {this.getPinnedDiscussions()}
        {this.getStandardDiscussions()}
        {this.getLockedDiscussions()}
      </div>
    );
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
            <div className="field is-grouped">
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
              <div className="control">
                <button className="button is-link">
                  <span className="icon">
                    <i className="fa fa-cog" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {this.getDiscussionData()}
      </div>
    );
  }
}

export default Discussions;
