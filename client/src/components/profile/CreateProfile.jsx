import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({ 
    bio: ''
  });

  const { bio } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history)
  };

  return (
    <Fragment>
      <form className="py-3" onSubmit={e => onSubmit(e)}>
        <div className="mb-3">
          <textarea
            onChange={e => onChange(e)}
            value={bio}
            placeholder="Add bio - optional ;)"
            name='bio'
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <button type="submit" className="btn btn-primary">Create profile</button>
      </form>
    </Fragment>
  )
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
