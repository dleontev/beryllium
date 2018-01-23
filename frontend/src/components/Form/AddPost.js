import React from "react";
import api from "../../api/Api";

class AddPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      isAnnouncement: this.props.isAnnouncement,
      title: "",
      message: ""
    }
  }

  handleSubmit(e){
    e.preventDefault();
     api
      .post(`/sessions/`, this.state)
      .then(response => {
        console.log(response);
      });
  }

  handleTitle(e){
    e.preventDefault();
    this.setState({title: e.target.value});
  }

  handleMessage(e){
    e.preventDefault();
    this.setState({message: e.target.value});
  }
  render() {
    return (
      <form>
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
              <button className="button is-link" type="submit" onSubmit={this.handleSubmit.bind(this)}>Submit</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddPost;
