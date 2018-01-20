import React from "react";

class AddPost extends React.Component {
  render() {
    return (
      <form>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input className="input" type="text" />
          </div>
        </div>
        <div className="field">
          <label className="label">Message</label>
          <div className="control">
            <textarea className="textarea" />
          </div>
        </div>
        <div className="level-right">
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-text">Cancel</button>
            </div>
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddPost;
