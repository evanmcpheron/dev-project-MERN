import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost, updatePost } from '../../actions/post';

const Post = ({ auth, getPost, updatePost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  const [formData, setFormData] = useState({
    text: '',
  });
  const { text } = formData;

  const [editMode, setEditMode] = useState({
    editModeState: 'normal-mode',
  });

  const { editModeState } = editMode;

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const editing = (event) => {
    setFormData({
      text: post.text,
    });

    if (editModeState === 'normal-mode') {
      setEditMode({
        editModeState: 'edit-mode',
      });
    } else {
      setEditMode({
        editModeState: 'normal-mode',
      });
    }
  };

  return (auth.loading && loading && auth.user === null) || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <Link className="btn" to="/posts">
          Back To Posts
        </Link>
        {editModeState === 'edit-mode' ? (
          <form
            style={{ marginBottom: '0' }}
            onSubmit={(event) => {
              event.preventDefault();
              setFormData({
                text: '',
              });
              updatePost({ text }, post._id);
            }}
          >
            <textarea
              type="text"
              value={text}
              placeholder="Post Text"
              name="text"
              onChange={(event) => onChange(event)}
            />
            <input
              className="btn btn-success admin-submit-btn"
              type="submit"
              value="Update Post"
              onClick={() => {
                setTimeout(() => {
                  setEditMode({ editModeState: 'normal-mode' });
                }, 500);
              }}
            />
          </form>
        ) : (
          <PostItem post={post} showActions={false} />
        )}
        {auth.user && auth.user._id === post.user ? (
          editMode.editModeState === 'edit-mode' ? (
            <button onClick={editing} className="btn">
              Done
            </button>
          ) : (
            <button onClick={editing} className="btn">
              Edit Post
            </button>
          )
        ) : null}

        <CommentForm postId={post._id} />
        <div style={{ paddingTop: '3rem' }}>
          {post.comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

Post.propTypes = {
  updatePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost, updatePost })(Post);
