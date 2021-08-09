import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfile = () => {
  const [formData, setFormData] = useState({ 
    bio: ''
  });

  const { bio } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <form className="py-3">
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

};

export default CreateProfile;
