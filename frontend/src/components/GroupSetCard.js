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
    const groups = this.props.groups;

    if (groups.length === 0) {
      return "There are currently no groups in this group set. Add a group to get started.";
    }

    return this.props.groups.map((group, index) => (
      <DropGroupCard
        key={group.id}
        name={group.name}
        handleMove={this.handleMove}
        id={group.id}
        members={this.props.members.filter(function(member) {
          return member.group_id === group.id;
        })}
        isUnassigned={false}
      />
    ));
  }

  updateGroup(userId, sourceGroup, targetGroup) {
    var members = this.props.members;

    var index = members.findIndex(
      m => m.id === userId && m.group_id === sourceGroup
    );

    if (index !== -1) {
      members[index].group_id = targetGroup;
    }

    this.setState({ members: members });
  }

  handleMove(userId, sourceGroup, targetGroup) {
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
          <nav className="navbar">
            <div className="navbar-end">
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button"
                    onClick={() => {
                      alert("Add group button is pressed.");
                    }}
                  >
                    <span className="icon">
                      <i className="fa fa-plus-circle" />
                    </span>
                    <span>Group</span>
                  </button>
                </div>

                <div className="control">
                  <button
                    className="button"
                    onClick={() => {
                      alert("Edit groupset button is pressed.");
                    }}
                  >
                    <span className="icon">
                      <i className="fa fa-edit" />
                    </span>
                    <span>Edit</span>
                  </button>
                </div>

                <div className="control">
                  <button
                    className="button is-danger is-outlined"
                    onClick={() => {
                      alert("Delete groupset button is pressed.");
                    }}
                  >
                    <span className="icon">
                      <i className="fa fa-trash" />
                    </span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div className="columns">
            <div className="column is-one-third">
              <DropGroupCard
                handleMove={this.handleMove}
                name="Unassigned Students"
                members={this.props.members.filter(function(member) {
                  return member.group_id === null;
                })}
                id={"-1"}
                isUnassigned={true}
              />
            </div>
            <div className="column">{this.getUserGroupData()}</div>
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default GroupSetCard;
