import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/tutorial';

const CommentItem = ({
    tutorialId,
    videoId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    commentId,
    deleteComment
}) => (
    <div className="playlist-comment-item">
        <div class="avatar-link">
            <Link to={`/profile/${user}`}>
                <img className="avatar" src={avatar} alt="" />
            </Link>
            <Link style={{ lineHeight: '1' }} to={`/profile/${user}`}>
                <h6>{name}</h6>
            </Link>
        </div>
        <div className="bottom-comment">
            <p>{text}</p>
            <div className="btn-comment">
                <p style={{ lineHeight: '1' }}>
                    Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button
                        className="btn btn-danger"
                        onClick={e =>
                            deleteComment(tutorialId, videoId, commentId)
                        }
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
    videoId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
