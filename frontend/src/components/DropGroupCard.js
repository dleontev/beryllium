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
    this.handleMove = this.handleMove.bind(this);
  }

  getMembers() {
    return this.props.members.map((member, index) => (
      <GroupMemberCard
        handleMove={this.handleMove}
        key={member.id}
        name={member.name}
        id={member.id}
        group_id={this.props.id}
      />
    ));
  }

  handleMove(userId, sourceGroup, targetGroup) {
    console.log("reached handlemove #1.")
    this.props.handleMove(userId, sourceGroup, targetGroup);
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;

    const isActive = canDrop && isOver;

    let className = "box";
    if (isActive) {
      className = "box is-over";
    }

    return connectDropTarget(
      <div className={className}>
        <p>{this.props.name}</p>
        {this.getMembers()}
      </div>
    );
  }
}

export default DropTarget("membercard", memberCardTarget, collect)(
  DropGroupCard
);
