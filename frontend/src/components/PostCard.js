import React from "react";

class PostCard extends React.Component {
  render() {
    return (
      /*
      <div>
        <li>
          <p>{this.props.id}</p>
          <p>{this.props.author_name}</p>
          <p>{this.props.inserted_at}</p>
          <p>{this.props.updated_at}</p>
          <p>{this.props.content}</p>
        </li>
        <br />
      </div>
      */
    <div className="box">
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png"/>
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong> NAME </strong>
              <br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
              <br/>
              <small><a className="button is-link">Like</a> · <a> Reply </a> · 3 hrs </small>
            </p>
          </div>
        </div>
      </article>
    </div>
      

    );
  }
}

export default PostCard;
