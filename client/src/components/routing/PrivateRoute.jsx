import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectIsAuthenticated, selectLoading } from '../../redux/selectors/auth';

const PrivateRoute = ({ isAuthenticated, loading, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login'/>
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  loading: selectLoading
});

export default connect(mapStateToProps)(PrivateRoute);
