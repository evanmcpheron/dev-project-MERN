import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTutorial } from '../../actions/tutorial';
import PropTypes from 'prop-types';

import VideoPlayerTwo from './src/components/VideoPlayerTwo';

const VideoPlayer = ({
    getTutorial,
    tutorial: { tutorial, loading },
    match
}) => {
    useEffect(() => {
        getTutorial(match.params.id);
    }, [getTutorial]);

    return (
        <div>
            <VideoPlayerTwo tutorial={tutorial.thumbnailUrl} />
        </div>
    );
};

VideoPlayer.propTypes = {
    getTutorial: PropTypes.func.isRequired,
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tutorial: state.tutorial
});

export default connect(mapStateToProps, { getTutorial })(VideoPlayer);
