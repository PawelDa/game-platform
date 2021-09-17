import React, { Fragment, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { getPost } from '../../redux/actions/post';
import { selectLoading, selectPostPost } from '../../redux/selectors/post';

import Spinner from '../layout/Spinner';

const Post = ({ getPost, post, loading, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match]);

  return (<div>Post</div>);
};

const mapStateToProps = createStructuredSelector({
  post: selectPostPost,
  loading: selectLoading
});

const mapDispatchToProps = dispatch => ({
  getPost: (postId) => dispatch(getPost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
