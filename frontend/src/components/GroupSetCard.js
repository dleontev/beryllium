import React from "react";
import DropGroupCard from "./DropGroupCard";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class GroupSetCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleMove = this.handleMove.bind(this);
  }

  getUserGroupData() {
    return this.props.groups.map((group, index) => (
      <DropGroupCard
        key={group.id}
        name={group.name}
        handleMove={this.handleMove}
        id={group.id}
        members={this.props.members.filter(function(member) {
          return member.group_id === group.id;
        })}
      />
    ));
  }

  updateGroup(userId, sourceGroup, targetGroup) {
    var members = this.props.members;

    var index = members.findIndex(
      m => m.id == userId && m.group_id === sourceGroup
    );

    if (index !== -1) {
      members[index].group_id = targetGroup;
    }

    this.setState({ members: members });
  }

  handleMove(userId, sourceGroup, targetGroup) {
    console.log("reached handlemove #2.");
    console.log("User id" + sourceGroup);
    console.log("Source group" + sourceGroup);
    console.log("Target group" + targetGroup);

    if (sourceGroup === "-1") {
      this.updateGroup(userId, null, targetGroup);
    } else if (targetGroup === "-1") {
      this.updateGroup(userId, sourceGroup, null);
    } else {
      this.updateGroup(userId, sourceGroup, targetGroup);
    }
  }

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <DropGroupCard
            handleMove={this.handleMove}
            name="Unassigned"
            members={this.props.members.filter(function(member) {
              return member.group_id === null;
            })}
            id={"-1"}
          />

          {this.getUserGroupData()}
        </div>
      </DragDropContextProvider>
    );
  }
}

export default GroupSetCard;
