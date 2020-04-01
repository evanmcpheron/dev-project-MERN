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
        <div>
            {isAuthenticated ? (
                <div>
                    <div>
                        <h3>Leave a Comment</h3>
                    </div>
                    <form
                        style={{ marginBottom: '5rem' }}
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
                            className="btn btn-success"
                            style={{ width: '100%' }}
                            type="submit"
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
