import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, getFollowingPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, getFollowingPost, auth, post: { posts, loading } }) => {
  useEffect(() => {
    // getPosts();
    getFollowingPost(auth.user._id);
  }, [getFollowingPost]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <h2>Posts</h2>
        <div>
          {posts.length === 0 ? (
            <p>Follow users to see their posts here.</p>
          ) : (
            posts.map((post) => <PostItem showActions={true} key={post._id} post={post} />)
          )}
        </div>
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getFollowingPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts, getFollowingPost })(Posts);
