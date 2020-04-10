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
          <img className="avatar" src={`${blankAvatar}`} alt="" />
        ) : (
          <img className="avatar" src={`/api/profile/avatar/${avatar}`} alt="" />
        )}

        <h5>{`${fName} ${lName}`}</h5>
      </div>
      <div>
        <p>
          - {status} {company && <span> at {company}</span>}
        </p>
        <p>- {location && <span>{location}</span>}</p>
      </div>
      <ul style={{ listStyle: 'none' }}>
        {skills.slice(0, 4).map((skill, index) => (
          <p>
            <li key={index}>
              <i className="fas fa-check" /> {skill}
            </li>
          </p>
        ))}
      </ul>
      <Link className="btn" to={`/profile/${_id}`}>
        View Profile
      </Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
