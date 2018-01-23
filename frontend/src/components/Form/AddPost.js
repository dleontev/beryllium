import React from "react";
import api from "../../api/Api";
import { Link, Redirect } from "react-router-dom";

class AddPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data: {
          sectionid: this.props.sectionid,
          is_discussion: this.props.is_discussion,
          title: "",
          message: ""
        },
        finish: false
    }
  }

  handleSubmit(e){
    e.preventDefault();
    console.log("Submitted");
     api
      .post(`/discussions/`, this.state.data)
      .then(response => {
        this.setState({finish: true});
      }).catch(error =>{
        console.log(error);
      });
  }

  handleTitle(e){
    e.preventDefault();
    var data = Object.assign({}, this.state.data);
    data.title = e.target.value;
    this.setState({data});
  }

  handleMessage(e){
    e.preventDefault();
    var data = Object.assign({}, this.state.data);
    data.message = e.target.value;
    this.setState({data});
  }
  render() {
    if(this.state.finish == true){
      if(this.props.is_discussion == false){
        return (
          <Redirect to={`/courses/${this.props.sectionid}/announcements`}/>
        );
      }else if(this.props.is_discussion == true){
        return (
          <Redirect to={`/courses/${this.props.sectionid}/discussions`}/>
        );
      }
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" type="text" onChange={this.handleTitle.bind(this)}/>
          </div>
        </div>
        <div className="field">
          <label className="label">Message</label>
          <div className="control">
            <textarea className="textarea" onChange={this.handleMessage.bind(this)} />
          </div>
        </div>
        <div className="level-right">
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-text">Cancel</button>
            </div>
            <div className="control">
              <button className="button is-link" type="submit">Submit</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddPost;
