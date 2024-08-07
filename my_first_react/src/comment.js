import React from 'react';


// function Comment({ comments = [] }) {
// class Comment extends component({ comments = [] }) {

class Comment extends React.Component {
    constructor(props) {
      super(props);
      this.state = { comments: props.comments || [] };
    }
    render() {
    return (
        <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
          {this.props.comments.map((comment, index) => (

            <div key={index} className="comment">
              
              <div className="avatar">
                <img src={comment.avatar} alt="avatar" />
              </div>
              <div className="content">
                <div className="author">{comment.author}</div>
                <div className="metadata">
                  <span className="date">{comment.date}</span>
                </div>
                <div className="text">{comment.text}</div>
                <div className="actions">
                  <div className="reply">Reply</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    };
  };


  
export default Comment;