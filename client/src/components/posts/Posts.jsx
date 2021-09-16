import React, { Fragment, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { getPosts } from '../../redux/actions/post';
import { selectPosts, selectLoading } from '../../redux/selectors/post';

import Spinner from '../layout/Spinner';

const Posts = ({ getPosts, posts, loading }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      POSTSTSTASDSFAF
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  posts: selectPosts,
  loading: selectLoading
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
