import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getProfiles } from '../../redux/actions/profile';
import { selectProfile } from '../../redux/selectors/profile';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Users</h1>
          <p className='lead'>
            <i className='fas fa-project-diagram'></i> Connect with other engineers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  // TODO destructure selectors
  profile: selectProfile
});

const mapDispatchToProps = dispatch => ({
  getProfiles: () => dispatch(getProfiles())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
