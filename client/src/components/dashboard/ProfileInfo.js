import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileInfo = ({ details }) => {
  return (
    <div>
      <Fragment>
        <h2>Your profile info</h2>
        <table>
          <thead>
            <tr>
              <th>First place</th>
              <th>Second place</th>
              <th>Third place</th>
              <th>Forth place</th>
            </tr>
          </thead>
          <tbody>{details}</tbody>
        </table>
      </Fragment>
    </div>
  )
};

ProfileInfo.propTypes = {
  
}

export default ProfileInfo;
