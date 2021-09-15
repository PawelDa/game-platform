import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsAuthenticated, selectLoading } from '../../redux/selectors/auth';
import { logout } from '../../redux/actions/auth';

const Navbar = ({ loading, isAuthenticated, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className="fas fa-user fa-sm"></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className="fas fa-sign-out-alt fa-sm"></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const questLinks = (
    <ul>
      <li>
        <Link to='/register'>
          <i className="fas fa-plus fa-sm"></i>{' '}
          <span className='hide-sm'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className="fas fa-sign-in-alt fa-sm"></i>{' '}
          <span className='hide-sm'>Login</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
          <i className="fas fa-cogs fa-sm"></i>{' '}
          <span className='hide-sm'>Engineers World</span>
        </Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : questLinks }</Fragment>) }
    </nav>
  )
}
const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  loading: selectLoading
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
