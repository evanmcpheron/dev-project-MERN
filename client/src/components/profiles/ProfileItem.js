import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import blankAvatar from '../../img/blank-avatar.jpg';

const ProfileItem = ({
  profile: {
    user: { _id, fName, lName, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile-grid">
      <div>
        {avatar === null ? (
          <div className="avatar-container">
            <Link to={`/profile/${_id}`}>
              <div className="avatar" style={{ backgroundImage: `url(${blankAvatar})` }} />
            </Link>
          </div>
        ) : (
          <div className="avatar-container">
            <Link to={`/profile/${_id}`}>
              <div
                className="avatar"
                style={{ backgroundImage: `url(/api/profile/avatar/${avatar})` }}
              />
            </Link>
          </div>
        )}
        <Link style={{ display: 'inline-flex' }} to={`/profile/${_id}`}>
          <h5>{`${fName} ${lName}`}</h5>
        </Link>
      </div>
      <div className="profile-body-info">
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p>{location && <span>{location}</span>}</p>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
