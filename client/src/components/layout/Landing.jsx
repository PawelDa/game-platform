import React from 'react'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsAuthenticated } from '../../redux/selectors/auth';

const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">-Engineers Social Network-</h1>
          <p className="lead">
            Create a profile, share posts and get in touch with other engineers!
          </p>
        </div>
      </div>
    </section>
  )
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated
});

export default connect(mapStateToProps)(Landing);
