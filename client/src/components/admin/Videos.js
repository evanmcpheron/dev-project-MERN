import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getTutorial } from '../../actions/admin';
import VideoForm from './VideoForm';
import TutorialItem from './TutorialItem';

const Videos = ({ getTutorial, tutorial: { tutorial, loading }, match }) => {
    useEffect(() => {
        getTutorial(match.params.id);
    }, [getTutorial]);

    console.log(tutorial, 'Tutorial.js');

    return loading || tutorial === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/admin">Back To Admin</Link>
            <VideoForm videoId={tutorial._id} />
            {tutorial.video.map(vid => (
                <TutorialItem key={vid._id} tutorial={vid} />
            ))}
        </Fragment>
    );
};

Videos.propTypes = {
    getTutorial: PropTypes.func.isRequired,
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tutorial: state.tutorial
});

export default connect(mapStateToProps, { getTutorial })(Videos);
