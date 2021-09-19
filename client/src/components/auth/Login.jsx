import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectIsAuthenticated } from '../../redux/selectors/auth';
import { login } from '../../redux/actions/auth';

export const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(formData);
  };

  // Redirect if logged in
  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Existing Users</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-black" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <strong><Link to='/register'>Register</Link></strong>
      </p>
    </Fragment>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
  login: (formData) => dispatch(login(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
