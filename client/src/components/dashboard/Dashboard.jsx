import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getCurrentProfile } from '../../redux/actions/profile';
import { selectAuth } from '../../redux/selectors/auth';
import { selectProfile } from '../../redux/selectors/profile';

import Spinner from '../layout/Spinner';

const Dashboard = ({ getCurrentProfile, auth, profile: { profile, loading} }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? <Spinner /> : <Fragment>something</Fragment>
};


const mapStateToProps = createStructuredSelector({
  // TODO change selectors when dashboard will be finisehd to not bring full auth and profile
  auth: selectAuth,
  profile: selectProfile
});

const mapDispatchToProps = dispatch => ({
  getCurrentProfile: () => dispatch(getCurrentProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
