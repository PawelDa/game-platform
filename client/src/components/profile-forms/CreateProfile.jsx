import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createProfile } from '../../redux/actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({ 
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [dispalaySocialInputs, toggleSociaInputs] = useState(false)

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
    document.documentElement.scrollTop = 0;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i>{' '}
        Give some information
      </p>
      <small>*fields required</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={(e) => onChange(e)}
          >
            <option value="0">*Select professional status</option>
            <option value="Engineer">Engineer</option>
            <option value="Junior Engineer">Junior Engineer</option>
            <option value="Senior Engineer">Senior Engineer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            What is your seniority level
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Current eployeer
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City and country (eg. London, UK)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg.Python,Civil Engineering Design,Geaotechnical Egineering)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="GitHub username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you are Software Enignner give your GitHub username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          >
          </textarea>
          <small className="form-text">
            Tell us a little about yourself
          </small>
        </div>
        <div className="my-2">
          <button
            onClick={() => toggleSociaInputs(!dispalaySocialInputs)}
            type="button"
            className="btn btn-white"
          >
            Add Social Network Links
          </button>
        </div>
        {dispalaySocialInputs && <Fragment>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input
              type="text"
              placeholder="Twitter URL"
              name="twitter" 
              value={twitter}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input
              type="text"
              placeholder="Facebook URL"
              name="facebook"
              value={facebook}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input
              type="text"
              placeholder="YouTube URL"
              name="youtube"
              value={youtube}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input
              type="text"
              placeholder="Linkedin URL"
              name="linkedin"
              value={linkedin}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input
              type="text"
              placeholder="Instagram URL"
              name="instagram" 
              value={instagram}
              onChange={(e) => onChange(e)}
            />
          </div>
        </Fragment>}
        <button type="submit" class="btn btn-black my-1">Submit</button>
        <a className="btn btn-white my-1" href="dashboard.html">Go Back</a>
      </form>
    </Fragment>
  )
};

const mapDispatchToProps = dispatch => ({
  createProfile: (formData, history) => dispatch(createProfile(formData, history))
});

export default connect(null, mapDispatchToProps)(withRouter(CreateProfile));
