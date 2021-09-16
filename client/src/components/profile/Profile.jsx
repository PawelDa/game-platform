import React, { Fragment, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProfileById } from '../../redux/actions/profile';
import { selectProfile } from '../../redux/selectors/profile';
import { selectAuth } from '../../redux/selectors/auth';

import Spinner from '../layout/Spinner';

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);

  return (
    <Fragment>
      {profile === null || loading ? <Spinner /> : <Fragment>
        <Link to='/profiles' className='btn btn-white'>
          Go back
        </Link>
        {auth.isAuthenticated && auth.loading === false && auth.user._id ===
        profile.user._id && (<Link to='/edit-profile' className='btn btn-black'>Edit profile</Link>)}
      </Fragment>}
    </Fragment>
  )
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  auth: selectAuth
});

const mapDispatchToProps = dispatch => ({
  getProfileById: (userId) => dispatch(getProfileById(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
