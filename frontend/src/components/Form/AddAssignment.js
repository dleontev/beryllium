import React from "react";
import GroupsetSelectionCard from "../GroupsetSelectionCard";
import GroupSelectionCard from "../GroupSelectionCard";
import UserSelectionCard from "../UserSelectionCard";
import { Redirect } from "react-router-dom";
import api from "../../api/Api";

class AddAssignment extends React.Component {
  constructor(props){
    super(props);
    this.handleSelectGroupset = this.handleSelectGroupset.bind(this);
    this.handleSelectGroup = this.handleSelectGroup.bind(this);
    this.handleSelectUser = this.handleSelectUser.bind(this);
    this.handleStoreGroups = this.handleStoreGroups.bind(this);
    this.state = {
      data: {
        section_id: this.props.match.params.id,
        content: "",
        title: "",
        due_at: "",
        type: 0,
        is_published: false, 
        points_possible: "",
        //groupsets: [],
        //groups: [],
        users: []
      },
      type: {
        "Short answer": 0,
        "File upload": 1,
        "Quiz": 2
      },
      dateString: "",
      hours: 23,
      minutes: 59,
      hoursCurrent: 0,
      pm: false,
      redirect: false,
      membershipData: [],
      groupData: []
    }
  }



  componentWillMount(){
    api.get(`/memberships/sections/${this.props.match.params.id}`)
      .then((result) =>{
        this.setState({membershipData: result.data.data});
        console.log(result.data.data);
      })
      .catch((error) =>{
        console.log(`AddAssignment.js: ${error}`);
      });
  }

  postAssignment(){
    api.post("/assignments/", this.state.data)
      .then((response)=>{
        this.setState({redirect: true});
      })
      .catch((error)=>{
        console.log(`AddAssignment ${error}`);
      });
  }

  handleTitle(event){
    var data = Object.assign({}, this.state.data);
    data.title = event.target.value;
    this.setState({ 
      data 
    });
  }

  handleDate(event){
    this.setState({ dateString: event.target.value });
  }

  handleType(event){
    console.log(event.target.value);
    var val = this.state.type[event.target.value];
    var data = Object.assign({}, this.state.data);
    data.type = val;
    this.setState({ 
      data 
    });
  }

  handleMinutes(event){
    this.setState({
      minutes: parseInt(event.target.value, 10)
    });
  }


  handlePm(event){
    this.setState({
      pm: !this.state.pm
    })
  }

  handlePublish(event){
    var data = Object.assign({}, this.state.data);
    data.is_published = !data.is_published;
    this.setState({ 
      data 
    });
    console.log(`Published: ${data.is_published}`);
  }


  handleHours(event){
    this.setState({
      hours: event.target.value
    });
    console.log(`${event.target.value} + PM(${this.state.pm})`);
  }

  handlePoints(event){
    var data = Object.assign({}, this.state.data);
    data.points_possible = parseInt(event.target.value, 10);
    this.setState({ 
      data 
    });
  }

  handleContent(event){
    var data = Object.assign({}, this.state.data);
    data.content = event.target.value;
    this.setState({ 
      data 
    });
  }

  convertToMilitary(){
    let val = 0;
    let currentHours = parseInt(this.state.hours, 10);
    if(this.state.pm === true){
      if(currentHours === 12){
        val = 12;
      }else{
        val = currentHours + 12;
      }
    }else{
      if(currentHours === 12){
        val = 0;
      }else{
        val = currentHours;
      }
    }
    let hourString = val > 9 ? `${val}` : `0${val}`;
    let minuteString = this.state.minutes > 9 ? `${this.state.minutes}` : `0${this.state.minutes}`;
    let finalString = `${this.state.dateString} ${hourString}:${minuteString}:00`;
    console.log(`Final String is ${finalString}\n`);
    return finalString;
  }

  handleStoreGroups(groups){
    this.setState({
      groupData: groups
    });
  }

  /*
  handleSelectGroupset(values){
    var data = Object.assign({}, this.state.data);
    data.groupsets = values;
    this.setState({
      data
    });
  }

  handleSelectGroup(values){
    var data = Object.assign({}, this.state.data);
    data.groups = values;
    this.setState({
      data
    });
  }

  handleSelectUser(values){
    var data = Object.assign({}, this.state.data);
    data.users = values;
    this.setState({
      data
    });
  }
  */


  clearGroups(){
    var select = document.getElementById('GroupSelectionCard');
    for(let i = 0, l = select.options.length; i < l; ++i){
      select.options[i].selected = false;
    }
  }
  clearGroupsets(){
    var select = document.getElementById('GroupsetSelectionCard');
    for(let i = 0, l = select.options.length; i < l; ++i){
      select.options[i].selected = false;
    }
  }

  handleSelectGroupset(values){
    console.log(this.state.groupData);
    console.log(`hit handleSelectGroup`);
    var selectGroupset = document.getElementById("GroupsetSelectionCard");
    var selectGroup = document.getElementById("GroupSelectionCard");
    var accumulator = [];
    for(let i = 0; i < selectGroupset.options.length; ++i){
      if(selectGroupset.options[i].selected){
        for(let j = 0; j < this.state.groupData.length; ++j){
          if(selectGroupset.options[i].id === this.state.groupData[j].groupset_id){
            accumulator.push(this.state.groupData[j].id);
          }
        }
      }
    }
    var found;
    for(let i = 0; i < selectGroup.options.length; ++i){
      found = false;
      for(let j = 0; j < accumulator.length; ++j){
        if(selectGroup.options[i].id === accumulator[j]){
          found = true;
          break;
        }
      }
      if(found === true){
        selectGroup.options[i].selected = 'selected';
      }else{
        selectGroup.options[i].selected = false;
      }
    }
    this.matchGroupsWithUsers();
  }


  handleSelectGroup(values){
    this.clearGroupsets();
    this.matchGroupsWithUsers();
  }

  handleSelectUser(values){
    this.clearGroupsets();
    this.clearGroups();
  }

  matchGroupsWithUsers(){
    var selectGroup = document.getElementById("GroupSelectionCard");
    var selectUser = document.getElementById("UserSelectionCard");
    var accumulator = [];
    for(let i = 0; i < selectGroup.options.length; ++i){
      if(selectGroup.options[i].selected){
        for(let j = 0; j < this.state.membershipData.length; ++j){
          if(selectGroup.options[i].id === this.state.membershipData[j].group_id){
            accumulator.push(this.state.membershipData[j].user_id);
          }
        }
      }
    }

    var found;
    for(let i = 0; i < selectUser.options.length; ++i){
      found = false;
      for(let j = 0; j < accumulator.length; ++j){
        if(selectUser.options[i].id === accumulator[j]){
          found = true;
          break;
        }
      }
      if(found === true){
        selectUser.options[i].selected = 'selected';
      }else{
        selectUser.options[i].selected = false;
      }
    }
  }
  
  setGroupSelected(group_id){
    console.log(`hit setGroupSelected`);
    var select = document.getElementById('GroupSelectionCard');
    for(let i = 0, l = select.options.length; i < l; ++i){
      if(select.options[i].id === group_id){
        select.options[i].selected = 'selected';
      }
    }
  }
  
  setUserSelected(user_id){
    console.log(`hit setUserSelected`);
    var select = document.getElementById('UserSelectionCard');
    for(let i = 0, l = select.options.length; i < l; ++i){
      if(select.options[i].id === user_id){
        select.options[i].selected = 'selected';
      }
    }
  }

  gatherSelectedUsers(){
    var select = document.getElementById("UserSelectionCard");
    var accumulator = [];
    for(let i = 0, l = select.options.length; i < l; ++i){
      if(select.options[i].selected){
        accumulator.push(select.options[i].id);
      }
    }
    return accumulator;
  }

  handleCreate(event){
    var data = Object.assign({}, this.state.data);
    data.due_at = this.convertToMilitary();
    data.users = this.gatherSelectedUsers();
    this.setState({ 
      data 
    },
    this.postAssignment);
  }

  render() {
    if(this.state.redirect === true){
      return <Redirect to={`/courses/${this.props.match.params.id}/assignments`}/>
    }
    return (
      <div>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" type="text" placeholder="Title of assignment" onChange={this.handleTitle.bind(this)}/>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <label className="label">Date due</label>
            <input className="input" type="text" placeholder="YYYY-MM-DD" onChange={this.handleDate.bind(this)}/>
          </div>

          <div className="control">
            <label className="label">Hours</label>
            <input
              className="input"
              type="number"
              min="1"
              max="12"
              text="0"
              name="hours"
              placeholder="1"
              onChange={this.handleHours.bind(this)}
            />
          </div>
          <div className="control">
            <label className="label">Minutes</label>
            <input
              className="input"
              type="number"
              min="0"
              max="59"
              text="0"
              name="minutes"
              placeholder="0"
              onChange={this.handleMinutes.bind(this)}
            />
          </div>

          <div className="control">
            <label className="checkbox">
              <input type="checkbox" onChange={this.handlePm.bind(this)}/>
              p.m.
            </label>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <label className="label">Type</label>
            <div className="select" onChange={this.handleType.bind(this)}>
              <select>
                <option>Short answer</option>
                <option>File upload</option>
                <option>Quiz</option>
              </select>
            </div>
          </div>
          <div className="control">
            <label className="label">Points possible</label>
            <input
              className="input"
              type="number"
              min="0"
              text="0"
              name="pointsPossible"
              placeholder="0"
              onChange={this.handlePoints.bind(this)}
            />
          </div>
        </div>

        <div className="field is-grouped">
            <GroupsetSelectionCard section_id = {this.props.match.params.id} handleSelect={this.handleSelectGroupset}/>
            <GroupSelectionCard section_id = {this.props.match.params.id} handleSelect = {this.handleSelectGroup} handleStoreGroups={this.handleStoreGroups}/>
            <UserSelectionCard section_id = {this.props.match.params.id} handleSelect = {this.handleSelectUser}/>
        </div>
        
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea className="textarea" placeholder="Describe the assignment" onChange={this.handleContent.bind(this)}></textarea>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" onChange={this.handlePublish.bind(this)}/>
              Publish
            </label>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.handleCreate.bind(this)}>Create</button>
          </div>
          <div className="control">
            <button className="button is-text">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAssignment;
