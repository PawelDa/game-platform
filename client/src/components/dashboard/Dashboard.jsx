import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { getCurrentProfile } from '../../redux/actions/profile';
import { selectAuth } from '../../redux/selectors/auth';
import { selectProfile } from '../../redux/selectors/profile';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome { user && user.name }
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You haven't set up profile!</p>
          <Link to='/create-profile' className='btn btn-black my-1'>
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
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
