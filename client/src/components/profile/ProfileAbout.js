import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { fName, lName },
  },
}) => {
  return (
    <div className="experience-profile">
      {bio && (
        <Fragment>
          <h3>{fName}'s Bio</h3>
          <p>{bio}</p>
          <div></div>
        </Fragment>
      )}
      <h3>Skill Set</h3>
      <div>
        {skills.map((skill, index) => (
          <div key={index}>
            <p>
              <i className="fas fa-check"></i>
              {'   '}
              {skill}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
