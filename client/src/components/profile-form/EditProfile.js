import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import harley from '../../img/banner/harley.jpg';
import birdy from '../../img/banner/birdy.jpg';
import bubbles from '../../img/banner/bubbles.jpg';
import colorKeys from '../../img/banner/colorKeys.jpg';
import computerChip from '../../img/banner/computerChip.jpg';
import coolKeyboard from '../../img/banner/coolKeyboard.jpg';
import lights from '../../img/banner/lights.jpg';
import openMac from '../../img/banner/openMac.jpg';
import pier from '../../img/banner/pier.jpg';
import otherMac from '../../img/banner/otherMac.jpg';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    banner: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      banner: loading || !profile.banner ? '' : profile.banner,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
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
    banner,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <section className="container">
        <h1>Edit Your Profile</h1>
        <p>
          <i className="fas fa-user"></i> Let's get some information to make your profile stand out
        </p>
        <small>* = required field</small>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <select
              value={status}
              style={{ marginBottom: '0' }}
              onChange={(event) => onChange(event)}
              name="status"
            >
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small>Give us an idea of where you are at in your career</small>
          </div>
          <div>
            <input
              style={{ marginBottom: '0' }}
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={(e) => onChange(e)}
            />
            <small>Could be your own company or one you work for</small>
          </div>
          <div>
            <input
              style={{ marginBottom: '0' }}
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={(e) => onChange(e)}
            />
            <small>Could be your own or a company website</small>
          </div>
          <div>
            <input
              style={{ marginBottom: '0' }}
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small>City & state suggested (eg. Boston, MA)</small>
          </div>
          <div>
            <input
              style={{ marginBottom: '0' }}
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={(e) => onChange(e)}
            />
            <small>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
          </div>
          <div>
            <input
              style={{ marginBottom: '0' }}
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={(e) => onChange(e)}
            />
            <small>If you want your latest repos and a Github link, include your username</small>
          </div>
          <div>
            <textarea
              style={{ marginBottom: '0' }}
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small>Tell us a little about yourself</small>
          </div>

          <div>
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              style={{ marginTop: '2rem' }}
              className="btn btn-warn"
              type="button"
            >
              Add Social Network Links
            </button>
            <div>Optional</div>
          </div>
          <div className="banner-option-container">
            <div className="form-check">
              <label className={banner === 'harley' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="harley"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={harley} />
              </label>
            </div>
            <div className="form-check">
              <label className={banner === 'birdy' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="birdy"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={birdy} />
              </label>
            </div>
            <div className="form-check">
              <label className={banner === 'bubbles' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="bubbles"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={bubbles} />
              </label>
            </div>
            <div className="form-check">
              <label className={banner === 'colorKeys' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="colorKeys"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={colorKeys} />
              </label>
            </div>
            <div className="form-check">
              <label className={banner === 'computerChip' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="computerChip"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={computerChip} />
              </label>
            </div>
            <div className="form-check">
              <label className={banner === 'coolKeyboard' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="coolKeyboard"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={coolKeyboard} />
              </label>
            </div>
            <div className="form-check">
              <label className={banner === 'lights' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="lights"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={lights} />
              </label>
            </div>
            <div className="form-check">
              <label className={banner === 'openMac' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="openMac"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={openMac} />
              </label>
            </div>
            <div className="form-check">
              <label className={banner === 'otherMac' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="otherMac"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={otherMac} />
              </label>
            </div>
            <div className="form-check">
              <label className={banner === 'pier' ? 'checked' : ''}>
                <input
                  type="radio"
                  name="banner"
                  value="pier"
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                <img className="banner-img-example" src={pier} />
              </label>
            </div>
            <small>Choose a banner photo for your profile.</small>
          </div>
          {displaySocialInputs && (
            <Fragment>
              {' '}
              <div className="mt2">
                <i className="fab fa-twitter fa-2x"></i>

                <input
                  type="text"
                  className="mt0"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mt2">
                <i className="fab fa-facebook fa-2x"></i>

                <input
                  type="text"
                  className="mt0"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mt2">
                <i className="fab fa-youtube fa-2x"></i>

                <input
                  type="text"
                  className="mt0"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mt2">
                <i className="fab fa-linkedin fa-2x"></i>

                <input
                  type="text"
                  className="mt0"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mt2">
                <i className="fab fa-instagram fa-2x"></i>

                <input
                  type="text"
                  className="mt0"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input
            type="submit"
            value="Submit"
            style={{ margin: '2rem 0' }}
            className="btn btn-success"
          />
        </form>
      </section>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
