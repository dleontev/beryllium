import React from "react";
import GroupMemberCard from "./GroupMemberCard";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

const memberCardTarget = {
  canDrop(props, monitor) {
    return monitor.getItem().group_id !== props.id;
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
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    handleMove: PropTypes.func.isRequired
  };

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
      .map((member, index) => (
        <GroupMemberCard
          handleMove={this.handleMove}
          key={member.id}
          name={member.name}
          id={member.id}
          group_id={this.props.id}
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
    console.log("reached handlemove #1.");
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
              />
              <span className="icon is-small is-left">
                <i className="fa fa-search" />
              </span>
          </div>
        </div>
      );
    }
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;

    const isActive = canDrop && isOver;

    let className = "panel";
    if (isActive) {
      className = "panel is-over";
    }

    return connectDropTarget(
      <div className={className}>
        <p className="panel-heading">{this.props.name}</p>

        {this.getSearchBar()}

        <div className="panel-block">{this.getMembers()}</div>
      </div>
    );
  }
}

export default DropTarget("membercard", memberCardTarget, collect)(
  DropGroupCard
);
