import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteVideo } from '../../actions/admin';

const TutorialItem = ({
    deleteVideo,
    tutorialId,
    tutorial: { _id, title, videoUrl, githubUrl }
}) => {
    return (
        <div className="video-admin-wrapper">
            <div className="video-admin-wrapper--info">
                <h4>{title}</h4>
                <p>{videoUrl}</p>
                <p>{githubUrl}</p>
            </div>
            <button
                className="btn btn-danger"
                onClick={e => deleteVideo(tutorialId, _id)}
                type="button"
            >
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
};

// TutorialItem.defaultProps = {
//     showActions: true
// };

TutorialItem.propTypes = {
    deleteVideo: PropTypes.func.isRequired,
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin,
    auth: state.auth
});

export default connect(mapStateToProps, { deleteVideo })(TutorialItem);
