import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Register = ({ setAlert }) => {
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
      console.log('User registered!')
    }
  };

  return (
    <Fragment>
      <form onSubmit={e => onSubmit(e)}>
        <div className="mb-3">
          <input
            placeholder="Username"
            name='name'
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            value={name}
            onChange={e => onChange(e)}
            required
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
        <div className="mb-3">
          <input
            placeholder="Confirm password"
            name='password2'
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </Fragment>
  )
};

export default connect(null, { setAlert })(Register);
