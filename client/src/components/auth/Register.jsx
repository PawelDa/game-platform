import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectIsAuthenticated } from '../../redux/selectors/auth';
import { setAlert } from '../../redux/actions/alert';
import { register } from '../../redux/actions/auth';

export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password })
    }
  };

  // Redirect if logged in
  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Account</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            minLength="6"
            value={passwordConfirm}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-black" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <strong><Link to='/login'>Sign In</Link></strong>
      </p>
    </Fragment>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
  register: (formData) => dispatch(register(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
