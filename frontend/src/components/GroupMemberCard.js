import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

const memberCardSource = {
  beginDrag(props) {
    return { name: props.name, id: props.id, group_id: props.group_id };
  },

  endDrag(props, monitor) {
    const member = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult && dropResult.id !== member.group_id) {
      props.handleMove(member.id, member.group_id, dropResult.id);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class GroupMemberCard extends React.Component {
  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  };

  render() {
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div className="button is-rounded">
        <span className="icon">
          <i className="fa fa-ellipsis-v" />
        </span>
        <span>{this.props.name}</span>
      </div>
    );
  }
}

export default DragSource("membercard", memberCardSource, collect)(
  GroupMemberCard
);
