import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <form className="py-3" onSubmit={e => onSubmit(e)}>
        <div className="mb-3">
          <input
            placeholder="Username"
            name='name'
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Email address"
            name='email'
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={e => onChange(e)}
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
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Confirm password"
            name='password2'
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </Fragment>
  )
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
