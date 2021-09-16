import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addEducation } from '../../redux/actions/profile';


const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
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
    addEducation(formData, history);
    document.documentElement.scrollTop = 0;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        <i className="fas fa-graduation-cap"></i> Add Your Education
      </h1>
      <small>*fields required</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="*School"
            name="school"
            value={school}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Degree"
            name="degree"
            value={degree}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of study"
            name="fieldofstudy"
            value={fieldofstudy}
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
            />{' '}Still studying
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
            placeholder="Program description"
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
  addEducation: (formData, history) => dispatch(addEducation(formData, history))
});

export default connect(null, mapDispatchToProps)(withRouter(AddEducation));
