import React from 'react';

const CommentSection = ({ comments = [] }) => {
  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <a className="avatar">
            <img src={comment.avatar} alt="avatar" />
          </a>
          <div className="content">
            <a className="author">{comment.author}</a>
            <div className="metadata">
              <span className="date">{comment.date}</span>
            </div>
            <div className="text">{comment.text}</div>
            <div className="actions">
              <a className="reply">Reply</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;