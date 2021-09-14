import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getCurrentProfile } from '../../redux/actions/profile';
import { selectAuth } from '../../redux/selectors/auth';
import { selectProfile } from '../../redux/selectors/profile';

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return <div>Dashboard</div>
};


const mapStateToProps = createStructuredSelector({
  auth: selectAuth,
  profile: selectProfile
});

const mapDispatchToProps = dispatch => ({
  getCurrentProfile: () => dispatch(getCurrentProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
