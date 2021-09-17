import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addComment } from '../../redux/actions/post';


const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
    <div className="bg-dark p">
      <h3>Leave a comment</h3>
    </div>
    <form
      className="form my-1"
      onSubmit={e => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
      }}
    >
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Your comment"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      ></textarea>
      <input type="submit" className="btn btn-black my-1" value="Submit" />
    </form>
  </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addComment: (postId, formData) => dispatch(addComment(postId, formData))
});

export default connect(null, mapDispatchToProps)(CommentForm);
