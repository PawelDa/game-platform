import React, { Fragment, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProfileById } from '../../redux/actions/profile';
import { selectProfile } from '../../redux/selectors/profile';
import { selectAuth } from '../../redux/selectors/auth';

import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGitHub from './ProfileGitHub';

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
        <div className='profile-grid my-1'>
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <div className='profile-exp bg-white p-2'>
            <h2 className="text-primary">Experience</h2>
            {profile.experience.length > 0 ? (<Fragment>
              {profile.experience.map(exp => (
                <ProfileExperience key={exp._id} experience={exp} />
              ))}
            </Fragment>) : (<h4>No experience</h4>)}
          </div>
          <div className='profile-edu bg-white p-2'>
            <h2 className="text-primary">Education</h2>
            {profile.education.length > 0 ? (<Fragment>
              {profile.education.map(edu => (
                <ProfileEducation key={edu._id} education={edu} />
              ))}
            </Fragment>) : (<h4>No education</h4>)}
          </div>
          {profile.githubusername && (
            <div className='profile-github'>
              <h2 className='text-primary my-1'>GitHub Repositories</h2>
              <ProfileGitHub username={profile.githubusername}/>
            </div>
          )}
        </div>
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
