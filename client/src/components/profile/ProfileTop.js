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

  const followingUser = () => {
    auth.user.following.filter((follow) => {
      if (follow._id.includes(_id)) {
        setFollow('Unfollow');
      }
    });
  };

  const followButton = (e) => {
    if (follow === 'Follow') {
      console.log('Follow');
      setFollow('Unfollow');
      addFollowing(auth.user._id, _id);
      addFollower(_id, auth.user._id);
    } else {
      console.log('Unfollow');
      setFollow('Follow');
      removeFollowing(auth.user._id, _id);
      removeFollower(_id, auth.user._id);
    }
  };

  return (
    <div className={`top-wrapper experience-profile banner-img ${banner}`}>
      {avatar === null ? (
        <img className="avatar" style={{ marginTop: '3rem' }} src={`${blankAvatar}`} alt="" />
      ) : (
        <img
          className="avatar"
          style={{ marginTop: '3rem' }}
          src={`/api/profile/avatar/${avatar}`}
          alt=""
        />
      )}

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
      <div>
        {following === undefined ? <p>0 Following</p> : <p>{following.length} Following</p>}
        <p>{followers.length} Followers</p>
        {auth.isAuthenticated && auth.loading === false && auth.user._id !== _id && (
          <button
            onClick={() => {
              followButton();
            }}
          >
            {follow}
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
