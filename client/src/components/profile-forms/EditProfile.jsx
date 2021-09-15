import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createProfile, getCurrentProfile } from '../../redux/actions/profile';
import { selectProfile } from '../../redux/selectors/profile';

const CreateProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
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

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.company,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
      facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
      linkedin: loading || !profile.social.linkedin ? '' : profile.social.linkedin,
      youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
      instagram: loading || !profile.social.instagram ? '' : profile.social.instagram
    });
  }, [loading]);

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

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  const onSubmit = e => {
    e.preventDefault();
    console.log(formData)
    createProfile(formData, history, true);
    document.documentElement.scrollTop = 0;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Edit Your Profile
      </h1>
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
        <button type="submit" className="btn btn-black my-1">Submit</button>
        <Link className="btn btn-white my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
};

const mapStateToProps = createStructuredSelector({
  // TODO add selector for destructured profile
  profile: selectProfile
});

const mapDispatchToProps = dispatch => ({
  createProfile: (formData, history, edit) => dispatch(createProfile(formData, history, edit)),
  getCurrentProfile: () => dispatch(getCurrentProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile));
