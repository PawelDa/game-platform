import React, { Fragment, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPost } from '../../redux/actions/post';
import { selectLoading, selectPostPost } from '../../redux/selectors/post';

import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post, loading, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match]);

  return loading || post === null ? <Spinner /> : <Fragment>
    <Link to='/posts' className='btn btn-white'>Back to posts</Link>
    <PostItem post={post} showAction={false} />
    <CommentForm postId={post._id} />
    <div className='comment'>
      {post.comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </div>
  </Fragment>;
};

const mapStateToProps = createStructuredSelector({
  post: selectPostPost,
  loading: selectLoading
});

const mapDispatchToProps = dispatch => ({
  getPost: (postId) => dispatch(getPost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
