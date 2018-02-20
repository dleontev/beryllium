import React from "react";
import GroupsetSelectionCard from "../GroupsetSelectionCard";
import GroupSelectionCard from "../GroupSelectionCard";
import UserSelectionCard from "../UserSelectionCard";
import { Redirect } from "react-router-dom";
import InputMoment from "input-moment";
import moment from "moment";
import "../../../node_modules/input-moment/dist/input-moment.css";
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
        is_groups: false,
        points_possible: "",
        assigned_to: []
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
      groupData: [],
      noGroupsSelected: false,
      noUsersSelected: false,
      m: moment(),
      filename: ""
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

  handleType(event){
    console.log(event.target.value);
    var val = this.state.type[event.target.value];
    var data = Object.assign({}, this.state.data);
    data.type = val;
    this.setState({ 
      data 
    });
  }

  handlePublish(event){
    var data = Object.assign({}, this.state.data);
    data.is_published = !data.is_published;
    this.setState({ 
      data 
    });
    console.log(`Published: ${data.is_published}`);
  }

  handleAssignToGroups(event){
    var data = Object.assign({}, this.state.data);
    data.is_groups = !data.is_groups;
    this.setState({ 
      data 
    });
    console.log(`Is groups: ${data.is_groups}`);
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
        if(this.state.noGroupsSelected === true){
          this.setState({
            noGroupsSelected: false
          });
        }
      }else{
        selectGroup.options[i].selected = false;
      }
    }
    this.matchGroupsWithUsers();
  }


  handleSelectGroup(values){
    this.clearGroupsets();
    this.matchGroupsWithUsers();
    if(values.length > 0 && this.state.noGroupsSelected === true){
      this.setState({
        noGroupsSelected: false
      });
    }
  }

  handleSelectUser(values){
    this.clearGroupsets();
    this.clearGroups();
    if(values.length > 0 && this.state.noUsersSelected === true){
      this.setState({
        noUsersSelected: false
      });
    }
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
        if(this.state.noUsersSelected === true){
          this.setState({
            noUsersSelected: false
          });
        }
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


  gatherSelectedGroups(){
    var select = document.getElementById("GroupSelectionCard");
    var accumulator = [];
    for(let i = 0, l = select.options.length; i < l; ++i){
      if(select.options[i].selected){
        accumulator.push(select.options[i].id);
      }
    }
    return accumulator;
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

  
  validateForm(){
    
  }
  
  handleCreate(event){
    var temp;
    var noGroupsSelected;
    var noUsersSelected;

    if(this.state.data.is_groups){
      temp = this.gatherSelectedGroups();
      if(temp.length === 0){
        noGroupsSelected = true;
        noUsersSelected = false;
      }else {
        noGroupsSelected = false;
        noUsersSelected = false;
      }
    }else{
      temp = this.gatherSelectedUsers();
      if(temp.length === 0){
        noUsersSelected = true;
        noGroupsSelected = false;
      }else{
        noUsersSelected = false;
        noGroupsSelected = false;
      }
    }
    this.setState({
      noGroupsSelected: noGroupsSelected,
      noUsersSelected: noUsersSelected
    }, ()=>{
      if(this.state.noGroupsSelected === false && this.state.noUsersSelected === false){
        var data = Object.assign({}, this.state.data);
        data.due_at = this.state.m.format("YYYY-MM-DD HH:mm:ss");
        data.assigned_to = temp;
        this.setState({ 
          data 
        },
        this.postAssignment);
      }
    });
  }

  handleTimeChange(m){
    this.setState({
      m
    });
  }

  handleFile(e){
    console.log(e.target.files[0]);
    this.setState({filename: e.target.files[0].name});
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

        <div className="control">
          <label className="label">Date due</label>
          <input className="input" type="text" value={this.state.m.format('llll')} readOnly />
        </div>
        <InputMoment
            moment={this.state.m}
            onChange={this.handleTimeChange.bind(this)}
            minStep={1}
          />
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
        {this.state.data.type === 2 ?
        <div className="file has-name">
          <label className="file-label">
            <input className="file-input" type="file" name="quiz" onChange={this.handleFile.bind(this)}/>
            <span className="file-cta">
              <span className="file-icon">
                <i className="fa fa-upload"></i>
              </span>
              <span className="file-label">
                Import CSV
              </span>
            </span>
            <span className="file-name">
              {this.state.filename === "" ? "*.csv" : this.state.filename}
            </span>
          </label>
        </div> : ""}
        <div className="field is-grouped">
            <GroupsetSelectionCard section_id = {this.props.match.params.id} handleSelect={this.handleSelectGroupset}/>
            <GroupSelectionCard section_id = {this.props.match.params.id} handleSelect = {this.handleSelectGroup} handleStoreGroups={this.handleStoreGroups} selected={this.state.noGroupsSelected}/>
            <UserSelectionCard section_id = {this.props.match.params.id} handleSelect = {this.handleSelectUser} is_groups={this.state.data.is_groups} selected={this.state.noUsersSelected}/>
        </div>
        
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea className="textarea" placeholder="Describe the assignment" onChange={this.handleContent.bind(this)}></textarea>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" onChange={this.handlePublish.bind(this)}/>
              Publish
            </label>
          </div>
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" onChange={this.handleAssignToGroups.bind(this)}/>
              Assign to Groups
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
        {this.state.noGroupsSelected ? <p class="help is-danger">Please select at least one group...</p> : ""}
        {this.state.noUsersSelected ?   <p class="help is-danger">Please select at least one user...</p> : ""}
      </div>
    );
  }
}

export default AddAssignment;
