import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addPost } from '../../redux/actions/post';


const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
    <div className="bg-dark p">
      <h3>Add a post</h3>
    </div>
    <form
      className="form my-1"
      onSubmit={e => {
        e.preventDefault();
        addPost({ text });
        document.documentElement.scrollTop = 0;
        setText('');
      }}
    >
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Create a post"
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
  addPost: (formData) => dispatch(addPost(formData))
});

export default connect(null, mapDispatchToProps)(PostForm);
