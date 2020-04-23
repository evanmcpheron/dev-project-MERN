import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blankAvatar from '../../img/blank-avatar.jpg';
import {
  addFollower,
  addFollowing,
  getProfileById,
  removeFollower,
  removeFollowing,
} from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileTop = ({
  profile: {
    profile: {
      status,
      company,
      location,
      website,
      social,
      banner,
      user: { fName, lName, avatar, followers, following, _id },
    },
  },
  profileID,
  auth,
  addFollower,
  addFollowing,
  removeFollower,
  removeFollowing,
  getProfileById,
  match,
}) => {
  useEffect(() => {
    getProfileById(profileID);
    followingUser();
  }, [getProfileById]);

  const [follow, setFollow] = useState('Follow');
  const [disabledBtn, setDisabledBtn] = useState(false);

  const followingUser = () => {
    auth.user.following.filter((follow) => {
      if (follow._id.includes(_id)) {
        setFollow('Unfollow');
      }
    });
  };

  const followButton = (e) => {
    if (follow === 'Follow') {
      setFollow('Unfollow');
      addFollowing(auth.user._id, _id);
      addFollower(_id, auth.user._id);
    } else {
      setFollow('Follow');
      removeFollowing(auth.user._id, _id);
      removeFollower(_id, auth.user._id);
    }
  };

  return (
    <div className={`top-wrapper experience-profile banner-img ${banner}`}>
      <div className="avatar-name">
        {avatar === null ? (
          <div className="avatar" style={{ backgroundImage: `url(${blankAvatar})` }} alt="" />
        ) : (
          <div
            className="avatar"
            style={{ backgroundImage: `url(/api/profile/avatar/${avatar})` }}
            alt=""
          />
        )}
        <div className="avatar-name-company">
          <h1>{`${fName} ${lName}`}</h1>
          <p>
            {status} {company && <span> at {company}</span>}
          </p>
        </div>
      </div>
      <p className="location">{location && <span>{location}</span>}</p>
      <div className="profile-links">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas profile-link fa-globe fa-2x"></i>
          </a>
        )}

        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab profile-link fa-twitter fa-2x"></i>
          </a>
        )}

        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab profile-link fa-facebook fa-2x"></i>
          </a>
        )}

        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab profile-link fa-linkedin fa-2x"></i>
          </a>
        )}

        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab profile-link fa-youtube fa-2x"></i>
          </a>
        )}

        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab profile-link fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
      <div className="following-info">
        {following === undefined ? <p>0 Following</p> : <p>{following.length} Following</p>}
        <p className="following-info-two">{followers.length} Followers</p>
        {auth.isAuthenticated && auth.loading === false && auth.user._id !== _id && (
          <button
            className="following-info-btn"
            style={{ marginRight: '2rem' }}
            onClick={() => {
              followButton();
              setDisabledBtn(true);
              setTimeout(() => setDisabledBtn(false), 2000);
            }}
            disabled={disabledBtn}
          >
            <p>{follow}</p>
          </button>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  addFollowing: PropTypes.func.isRequired,
  addFollower: PropTypes.func.isRequired,
  removeFollower: PropTypes.func.isRequired,
  removeFollowing: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addFollower,
  addFollowing,
  getProfileById,
  removeFollowing,
  removeFollower,
})(ProfileTop);
