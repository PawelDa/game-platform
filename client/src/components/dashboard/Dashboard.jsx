import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { deleteAccount, getCurrentProfile } from '../../redux/actions/profile';
import { selectUser } from '../../redux/selectors/auth';
import { selectLoading, selectProfileProfile } from '../../redux/selectors/profile';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ deleteAccount, getCurrentProfile, user, profile, loading }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

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
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => deleteAccount()}
            >
              <i className='fas fa-user-minus'></i> Delete account
            </button>
          </div>
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
  user: selectUser,
  profile: selectProfileProfile,
  loading: selectLoading,
});

const mapDispatchToProps = dispatch => ({
  getCurrentProfile: () => dispatch(getCurrentProfile()),
  deleteAccount: () => dispatch(deleteAccount())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
