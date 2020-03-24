import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/tutorial';

const CommentForm = ({
    tutorialId,
    videoId,
    addComment,
    auth: { isAuthenticated }
}) => {
    const [text, setText] = useState('');

    return (
        <div className="post-form">
            {isAuthenticated ? (
                <div>
                    <div className="bg-primary p">
                        <h3>Leave a Comment</h3>
                    </div>
                    <form
                        className="form my-1"
                        onSubmit={e => {
                            e.preventDefault();
                            addComment(videoId, tutorialId, { text });
                            setText('');
                        }}
                    >
                        <textarea
                            name="text"
                            cols="30"
                            rows="5"
                            placeholder="Create a post"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            required
                        />

                        <input
                            type="submit"
                            className="btn btn-dark my-1"
                            value="Submit"
                        />
                    </form>
                </div>
            ) : (
                <h2>You must be logged in to post comments</h2>
            )}
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentForm);
