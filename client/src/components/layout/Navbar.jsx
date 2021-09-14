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
        <a onClick={logout} href='#!'>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const questLinks = (
    <ul>
      <li><Link to='/register'>Register</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-cogs"></i> Engineers World</Link>
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
