import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Register = () => {
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
      // TODO add allert later for now console.log
      console.log('Passwords do not match');
    } else {
      const newUser = { name, email, password },
      // Creating new User
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const body = JSON.stringify(newUser)

        const res = await axios.post('/api/users', body, cofig);
        console.log(res.data)
      } catch (error) {

      }
    }
  }

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

export default Register;
