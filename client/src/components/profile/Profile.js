import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { getMyPosts } from '../../actions/post';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import Avatar from '../avatar/Avatar';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';

const Profile = ({
  getProfileById,
  getMyPosts,
  post: { posts },
  match,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getMyPosts(match.params.id);
  }, [getProfileById, getMyPosts, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container">
            <Link to="/profiles" className="btn tablet">
              Back to Profiles
            </Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn tablet" style={{ marginLeft: '2rem' }}>
                Edit Profile
              </Link>
            )}
            <div>
              <ProfileTop auth={auth} profileID={match.params.id} />
              <ProfileAbout profile={profile} />
              <div className="bottomGrid experience-education">
                <div className="experience-profile">
                  <h2>Experience</h2>
                  {profile.experience.length > 0 ? (
                    <Fragment>
                      {profile.experience.map((experience) => (
                        <ProfileExperience key={experience._id} experience={experience} />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No Experience Listed</h4>
                  )}
                </div>

                <div className="experience-profile">
                  <h2>Education</h2>
                  {profile.education.length > 0 ? (
                    <Fragment>
                      {profile.education.map((education) => (
                        <ProfileEducation key={education._id} education={education} />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No Education Listed</h4>
                  )}
                </div>
              </div>
              {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
            </div>
            <div>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && <PostForm />}
              {posts.map((post) => (
                <PostItem showActions={true} key={post._id} post={post} />
              ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getMyPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getProfileById, getMyPosts })(Profile);
