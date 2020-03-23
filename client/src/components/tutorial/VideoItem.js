import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { VideoPlayer } from '../videoPlayer/VideoPlayer';
import VideoPlayerTwo from '../videoPlayer/src/components/VideoPlayerTwo';

const VideoItem = ({
    tutorialId,
    video: { _id, title, position, videoUrl, githubUrl, comments }
}) => (
    <div className="post bg-white p-1 my-1">
        <div>
            <p>{title}</p>
            <p>{position}</p>
            <p>{videoUrl}</p>
            <p>{githubUrl}</p>
            {/* {comments.map(comment => {
                return (
                    <div key={_id}>
                        <img
                            src={comment.avatar}
                            alt={`${comment.name}'s avatar`}
                        />
                        <p>{comment.name}</p>
                        <p>{comment.text}</p>
                    </div>
                );
            })} */}
        </div>
    </div>
);

VideoItem.propTypes = {
    tutorialId: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     auth: state.auth
// });

export default connect(null, {})(VideoItem);
