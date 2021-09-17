import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Moment from 'react-moment';

import { deleteComment } from '../../redux/actions/post';
import { selectAuth } from '../../redux/selectors/auth';

const CommentItem = ({
  postId,
  deleteComment,
  auth,
  comment: {
    _id,
    text,
    name,
    avatar,
    user,
    date
  }
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => {
            deleteComment(postId, _id);
            document.documentElement.scrollTop = 0;
          }}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      )}
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  auth: selectAuth
});

const mapDispatchToProps = dispatch => ({
  deleteComment: (postId, commentId) => dispatch(deleteComment(postId, commentId))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
