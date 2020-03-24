import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getTutorial } from '../../actions/tutorial';
import VideoForm from './VideoForm';

const Videos = ({ getTutorial, tutorial: { tutorial, loading }, match }) => {
    useEffect(() => {
        getTutorial(match.params.id);
    }, [getTutorial]);

    console.log(tutorial, 'Tutorial.js');

    return loading || tutorial === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/admin" className="btn">
                Back To Admin
            </Link>
            <VideoForm videoId={tutorial._id} />
            {tutorial.video.map(vid => (
                <div key={vid._id}>
                    <h2>{vid.title}</h2>
                    <p>{vid.position}</p>
                    <p>{vid.videoUrl}</p>
                    <p>{vid.githubUrl}</p>
                    <hr />
                </div>
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
