import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Avatar from '../avatar/Avatar';
import { getMyPosts } from '../../actions/post';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';

const Dashboard = ({
  getCurrentProfile,
  getMyPosts,
  auth,
  post: { posts },
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getMyPosts(user._id);
  }, []);

  return (loading && profile === null) || user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container dashboard-wrapper">
        <h1>Dashboard</h1>
        {profile !== null ? (
          <Fragment>
            <Avatar profile={profile.user} />
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && <PostForm />}
              {posts.map((post) => (
                <PostItem showActions={true} key={post._id} post={post} />
              ))}
            </div>
            <div>
              <button className="btn btn-danger my2" onClick={() => deleteAccount()}>
                <i className="fas fa-user"></i> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="/create-profile">Create Profile</Link>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getMyPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, { getCurrentProfile, getMyPosts, deleteAccount })(
  Dashboard
);
