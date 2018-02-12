import React from "react";

class AddAssignment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
        section_id: this.props.match.params.id,
        content: "",
        title: "",
        due_at: "",
        type: 0,
        is_published: false, 
        points_possible: ""
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
      pm: false
    }
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
    return finalString;
  }

  handleCreate(event){
    console.log(this.convertToMilitary());
  }

  render() {
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
              name="hours"
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

        <div className="field">
          <label className="label">Type</label>
          <div className="control">
            <div className="select" onChange={this.handleType.bind(this)}>
              <select>
                <option>Short answer</option>
                <option>File upload</option>
                <option>Quiz</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea className="textarea" placeholder="Describe the assignment"></textarea>
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
