import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileInfo = (profile) => {
  return (
    <div>
      <Fragment>
        <h4>Your bio: {profile.details.bio}</h4>
        <h6>Winner {profile.details.games.winner}</h6>
        <h6>2nd {profile.details.games.secondPlace}</h6>
        <h6>3rd {profile.details.games.thirdPlace}</h6>
        <h6>4th {profile.details.games.forthPlace}</h6>
      </Fragment>
    </div>
  )
};

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileInfo;
