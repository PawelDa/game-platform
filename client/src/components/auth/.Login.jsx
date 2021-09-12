import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirecting if loging in successfull
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <form className="py-3" onSubmit={e => onSubmit(e)}>
        <div className="mb-3">
          <input
            placeholder="Email address"
            name='email'
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Password"
            name='password'
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </Fragment>
  )
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
