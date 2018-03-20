import React from "react";
import GroupMemberCard from "./GroupMemberCard";
import PropTypes from "prop-types";

import { DropTarget } from "react-dnd";

const memberCardTarget = {
  canDrop(props, monitor) {
    var item = monitor.getItem();

    return (
      item.group_id !== props.id &&
      (props.max_members === 0 ||
        (props.max_members > 0 && props.max_members !== props.members.length))
    );
  },

  drop({ id }) {
    return {
      id: `${id}`
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class DropGroupCard extends React.Component {
  constructor() {
    super();
    this.state = {
      nameFilter: ""
    };

    this.handleMove = this.handleMove.bind(this);
  }

  handleChange(event) {
    this.setState({ nameFilter: event.target.value.toLowerCase() });
  }

  getMemberList() {
    return this.props.members
      .filter(m => m.name.toLowerCase().includes(this.state.nameFilter))
      .map(member => (
        <GroupMemberCard
          handleMove={this.handleMove}
          group_id={this.props.id}
          key={member.id}
          name={member.name}
          id={member.id}
        />
      ));
  }

  getMembers() {
    if (this.props.members !== null && this.props.members.length > 0) {
      return (
        <div className="field is-grouped is-grouped-multiline">
          {this.getMemberList()}
        </div>
      );
    }

    return "There are currently no students in this group. Add a student to get started.";
  }

  handleMove(userId, sourceGroup, targetGroup) {
    this.props.handleMove(userId, sourceGroup, targetGroup);
  }

  getSettingsMenu() {
    if (!this.props.isUnassigned) {
      return (
        <div className="navbar-end">
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-outlined">
                <span className="icon">
                  <i className="fa fa-edit" />
                </span>
              </button>
            </div>

            <div className="control">
              <button className="button is-outlined">
                <span className="icon is-medium">
                  <i className="fa fa-trash-o lg" />
                </span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <div />;
  }

  getSearchBar() {
    if (this.props.isUnassigned) {
      return (
        <div className="panel-block">
          <div className="control has-icons-left ">
            <input
              className="input"
              type="text"
              value={this.state.nameFilter}
              placeholder="Search users"
              onChange={this.handleChange.bind(this)}
              autoFocus
            />
            <span className="icon is-small is-left">
              <i className="fa fa-search" />
            </span>
          </div>
        </div>
      );
    }
  }

  getEditButton() {
    if (!this.props.isUnassigned) {
      return <a onClick={() => this.props.handleGroupEdit()}>Edit</a>;
    }
  }

  getDeleteButton() {
    if (!this.props.isUnassigned) {
      return <a onClick={() => this.props.handleGroupDelete()}>Delete</a>;
    }
  }

  getFullStatus() {
    if (!this.props.isUnassigned) {
      return this.props.members.length === this.props.max_members &&
        this.props.max_members > 0 ? (
        <span className="label-info">Full</span>
      ) : (
        ""
      );
    }
  }

  getMemberCount() {
    if (!this.props.isUnassigned) {
      return (
        <span className="label-info">
          {this.props.members.length}{" "}
          {this.props.max_members > 0 ? "/ " + this.props.max_members : ""}{" "}
          members
        </span>
      );
    }
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;

    const isActive = canDrop && isOver;

    let className = this.props.isUnassigned ? "panel fixed" : "panel";
    if (isActive) {
      className = "panel is-over";
    }

    return connectDropTarget(
      <div className={className}>
        <div className="panel-heading">
          <nav className="level">
            <div className="level-left">
              <div className="level-item">{this.props.name}</div>
            </div>

            <div className="level-right">
              <p className="level-item">{this.getFullStatus()}</p>
              <p className="level-item">{this.getMemberCount()}</p>
              <p className="level-item">{this.getEditButton()}</p>
              <p className="level-item">{this.getDeleteButton()}</p>
            </div>
          </nav>
        </div>

        {this.getSearchBar()}

        <div className="panel-block">{this.getMembers()}</div>
      </div>
    );
  }
}

DropGroupCard.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  handleMove: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  isUnassigned: PropTypes.bool.isRequired,
  max_members: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleGroupDelete: PropTypes.func,
  handleGroupEdit: PropTypes.func
};

export default DropTarget("membercard", memberCardTarget, collect)(
  DropGroupCard
);
