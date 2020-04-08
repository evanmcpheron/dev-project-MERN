import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => (
  <div className="post-item">
    <div className="avatar-post">
      <Link className="avatar-center" to={`/profile/${user}`}>
        <p>{name}</p>
      </Link>
    </div>
    <div className="post-text">
      <p style={{ paddingBottom: '2rem' }}>{text}</p>
      <div className="bottom-post-text">
        <span></span>
        <p className="moment" style={{ marginRight: '1rem' }}>
          Posted on<span style={{ paddingRight: '1rem' }}></span>{' '}
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        <Fragment></Fragment>
        {!auth.loading && user === auth.user._id && (
          <button
            style={{ cursor: 'pointer' }}
            className="danger-button"
            onClick={(e) => deleteComment(postId, _id)}
            type="button"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
