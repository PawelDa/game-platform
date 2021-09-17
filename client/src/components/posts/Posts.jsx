import React, { Fragment, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { getPosts } from '../../redux/actions/post';
import { selectPosts, selectLoading } from '../../redux/selectors/post';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, posts, loading }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? <Spinner /> : <Fragment>
    <h1 className='large text-primary'>Posts</h1>
    <PostForm />
    <div className='posts'>
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  </Fragment>;
};

const mapStateToProps = createStructuredSelector({
  posts: selectPosts,
  loading: selectLoading
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
