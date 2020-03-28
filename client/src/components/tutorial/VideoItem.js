import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const VideoItem = ({ video: { title, position, videoUrl, githubUrl } }) => (
    <div>
        <div>
            <p>{title}</p>
            <p>{position}</p>
            <p>{videoUrl}</p>
            <p>{githubUrl}</p>
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
