import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addExperience } from '../../redux/actions/profile';


const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    company,
    title,
    location,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault();
    addExperience(formData, history);
    document.documentElement.scrollTop = 0;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        <i className="fas fa-project-diagram"></i> Add A Job Experience
      </h1>
      <small>*fields required</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Job title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Company"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current});
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}Current job
          </p>
        </div>
        <div className="form-group">
          <h4>To date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-black my-1">Submit</button>
        <Link className="btn btn-white my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
};

const mapDispatchToProps = dispatch => ({
  addExperience: (formData, history) => dispatch(addExperience(formData, history))
});

export default connect(null, mapDispatchToProps)(withRouter(AddExperience));
