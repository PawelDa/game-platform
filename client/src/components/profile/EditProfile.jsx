import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({ 
    bio: ''
  });

  useEffect(() => {
    if (!profile) getCurrentProfile();

    setFormData({
      bio: loading || !profile.bio ? '' : profile.bio
    }, [loading]);
  }, [getCurrentProfile, loading, profile]);

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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </Fragment>
  )
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
