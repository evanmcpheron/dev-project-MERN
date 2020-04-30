import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/tutorial';
import blankAvatar from '../../img/blank-avatar.jpg';

const CommentItem = ({
  tutorialId,
  videoId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  commentId,
  deleteComment,
}) => (
  <div className="post-item">
    <div className="avatar-post">
      <div className="avatar-name-container">
        <Link className="avatar-center" to={`/profile/${user}`}>
          {avatar === null ? (
            <div className="avatar-container">
              <div
                className="avatar-post avatar"
                style={{ backgroundImage: `url(${blankAvatar})` }}
              />
            </div>
          ) : (
            <div className="avatar-container">
              <div
                className="avatar-post avatar"
                style={{ backgroundImage: `url(/api/profile/avatar/${avatar})` }}
              />
            </div>
          )}
        </Link>
      </div>
    </div>
    <div className="post-text">
      <p className="top-post-text">
        <span>
          <Link to={`/profile/${user}`}>
            <p className="poster-name">{name}</p>
          </Link>
        </span>
        {text}
      </p>
      <div className="bottom-post-text">
        <p className="moment">
          Posted on <span></span>
          <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
        <Fragment>
          {!auth.loading && user === auth.user._id && (
            <button
              className="danger-button"
              onClick={(e) => deleteComment(tutorialId, videoId, commentId)}
              type="button"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </Fragment>
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  videoId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
