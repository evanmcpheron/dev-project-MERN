import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLike, removeLike, deletePost } from '../../actions/post';
import blankAvatar from '../../img/blank-avatar.jpg';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className="post-item">
      <div className="avatar-post">
        <Link className="avatar-center" to={`/profile/${user}`}>
          {avatar === null ? (
            <div className="avatar-container">
              <div className="avatar-post" style={{ backgroundImage: `url(${blankAvatar})` }} />
            </div>
          ) : (
            <div className="avatar-container">
              <div
                className="avatar-post"
                style={{ backgroundImage: `url(/api/profile/avatar/${avatar})` }}
              />
            </div>
          )}
        </Link>
        <Link to={`/profile/${user}`}>
          <p className="poster-name">{name}</p>
        </Link>
      </div>
      <div className="post-text">
        <p className="top-post-text">{text}</p>
        <div className="bottom-post-text">
          <p className="moment">
            Posted on <span></span>
            <Moment format="MM/DD/YYYY">{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              <button className="success-button" onClick={(e) => addLike(_id)} type="button">
                <i className="fas fa-thumbs-up"></i>
                {likes.length > 0 && <span> {likes.length}</span>}
              </button>
              <button onClick={(e) => removeLike(_id)} type="button" className="danger-button">
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/post/${_id}`} className="button">
                Comments {comments.length > 0 && <span>{comments.length}</span>}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button className="danger-button" onClick={(e) => deletePost(_id)} type="button">
                  <i className="fas fa-times"></i>
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
