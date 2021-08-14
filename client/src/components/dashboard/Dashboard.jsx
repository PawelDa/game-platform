import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import ProfileInfo from './ProfileInfo';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? <Spinner /> : <Fragment>
    <h1 className="large">Dashboard</h1>
    <p><i className="fas fa-user"></i> Welcome {user && user.name}</p>
    {profile !== null ? (
      <Fragment>
        <ProfileInfo profile={profile} />
        <DashboardActions />
      </Fragment>
    ) : (
      <Fragment>
        <p>Add some info</p>
        <Link to='/create-profile' className='btn btn-primary my-1' >Add profile</Link>
      </Fragment>
    )}
  </Fragment>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
