import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

const memberCardSource = {
  beginDrag(props) {
    return {
      name: props.name,
      id: props.id,
      group_id: props.group_id
    };
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
  getContextMenu() {
    return (
      <div className="dropdown-content">
        <div className="dropdown-item">
          <center>Add to group</center>
        </div>
        <hr className="dropdown-divider" />
        <div className="dropdown-item">...Group list placeholder...</div>
      </div>
    );
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div className="control">
        <div className="tags has-addons">
          <span className="tag is-medium">
            <div className="field is-grouped">
              <div className="control">
                <label>{this.props.name}</label>
              </div>
              <div className="control">
                <div className="dropdown is-hoverable">
                  <div className="dropdown-trigger">
                    <span className="icon is-small">
                      <i className="fa fa-angle-down" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    {this.getContextMenu()}
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

GroupMemberCard.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default DragSource("membercard", memberCardSource, collect)(
  GroupMemberCard
);
