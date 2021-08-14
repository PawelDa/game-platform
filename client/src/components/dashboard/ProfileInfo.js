import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileInfo = ({ profile }) => {
  return (
    <div>
      <Fragment>
        <h2>Your profile info</h2>
        <h1>{profile.id}</h1>
      </Fragment>
    </div>
  )
};

ProfileInfo.propTypes = {
  
}

export default ProfileInfo;
