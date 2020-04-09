import React from 'react';
import PropTypes from 'prop-types';

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

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    banner,
    user: { fName, lName, avatar },
  },
}) => {
  return (
    <div className={`top-wrapper experience-profile banner-img ${banner}`}>
      <img
        className="avatar"
        style={{ marginTop: '3rem' }}
        src={`/api/profile/avatar/${avatar}`}
        alt=""
      />
      <h1>{`${fName} ${lName}`}</h1>
      <p>
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '3rem 0',
        }}
      >
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}

        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}

        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}

        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}

        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}

        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
